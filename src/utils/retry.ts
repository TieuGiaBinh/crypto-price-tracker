import { sleep } from "./sleep";
import { logger } from "./logger";

interface RetryOptions {
    maxAttempts?: number;
    delayMs?: number;
    shoudRetry?: (error: unknown) => boolean;
}
export async function retry<T>(
    operation: () => Promise<T>,
    option: RetryOptions = {
        maxAttempts = 3,
        delayMs = 100,
        shouldRetry = () => true
    }
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

            if (attempt < maxAttempts && shouldRetry(error)) {

                const waitTime =
                    delayMs *
                    Math.pow(
                        2,
                        attempt - 1
                    );
              
                logger.warn(`Attempt ${attempt} failed. Retrying in ${waitTime} seconds`);

                await sleep(waitTime);

            } else {
                throw lastError;
            }

        }

    }

    throw lastError;

}
