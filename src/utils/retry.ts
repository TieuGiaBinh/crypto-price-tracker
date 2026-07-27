import { sleep } from "./sleep";
import { logger } from "./logger";

export async function retry<T>(
    operation: () => Promise<T>,
    maxAttempts = 3,
    delayMs = 1000
): Promise<T> {

    let lastError: unknown;

    for (
        let attempt = 1;
        attempt <= maxAttempts;
        attempt++
    ) {

        try {

            return await operation();

        } catch (error) {

            lastError = error;

            if (attempt < maxAttempts) {

                const waitTime =
                    delayMs *
                    Math.pow(
                        2,
                        attempt - 1
                    );
              
                logger.warn(`Attempt ${attempt} failed`);

                await sleep(waitTime);

            }

        }

    }

    throw lastError;

}
