import { HttpClient } from "./HttpClient";
import { HttpError } from "./HttpError";
import { retry } from "../utils/retry";
import { logger } from "../utils/logger";

export class FetchHttpClient
    implements HttpClient {

    constructor(
        private readonly timeoutMs = 5000
    ) {}

    async get<T>(url: string): Promise<T> {

        logger.info(`GET ${url}`);

        return retry(

            async () => {

                const controller = new AbortController();

                const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

                try {

                    const response = await fetch(url, {signal: controller.signal});

                    if (!response.ok) {

                        throw new HttpError(response.status, `HTTP ${response.status}`);
                    }

                    return await response.json() as T;

                } finally {

                    clearTimeout(timeout);

                }

            },

            {
                maxAttempts: 3,
                delayMs: 1000,
                shouldRetry: (error) => this.shouldRetry(error)
            }

        );
    }

    private shouldRetry(error: unknown): boolean {

        if (!(error instanceof HttpError)) {

            // Network error / timeout
            return true;
        }

        return [429, 500, 502, 503, 504].includes(error.status);
    }
}
