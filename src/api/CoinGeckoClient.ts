import { Coin } from "../models/Coin";
import { HttpClient } from "./HttpClient";
import { PriceProvider } from "./PriceProvider";
import { CoinGeckoResponse } from "./types/CoinGeckoResponse";

export class CoinGeckoClient implements PriceProvider {

    constructor(
        private readonly httpClient: HttpClient
    ) {}

    async getPrice(
        coin: Coin
    ): Promise<number> {

        const url =
            `https://api.coingecko.com/api/v3/simple/price` +
            `?ids=${coin}&vs_currencies=usd`;

        const data =
            await this.httpClient.get<CoinGeckoResponse>(url);

        return data[coin].usd;
    }
}
