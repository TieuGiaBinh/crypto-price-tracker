import { HttpClient } from "./HttpClient";
import { retry } from "../utils/retry";
import { logger } from "../utils/logger"

export class FetchHttpClient
    implements HttpClient {

    async get<T>(url: string): Promise<T> {

        const controller = new AbortController();

        const timeout = setTimeout(() => controller.abort(), 5000);
        
        const response = await retry(
            () => fetch(url, {
            signal: controller.signal
            })
        );

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        } else {
            clearTimeout(timeout)
            logger.info(`Get ${url} sucessfull`)
        }
        
        return await response.json() as T;

    }

}
