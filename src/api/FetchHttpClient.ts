import { HttpClient } from "./HttpClient";

export class FetchHttpClient
    implements HttpClient {

    async get<T>(url: string): Promise<T> {

        const controller = new AbortController();

        const timeout = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(url, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        return await response.json() as T;

    }

}
