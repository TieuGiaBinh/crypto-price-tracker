import { HttpClient } from "./HttpClient";

export class FetchHttpClient
    implements HttpClient {

    async get<T>(url: string): Promise<T> {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        return await response.json() as T;

    }

}
