import { Coin } from "../models/Coin";
import { HttpClient } from "./HttpClient";
import { PriceProvider } from "./PriceProvider";
import { CoinGeckoResponse } from "./types/CoinGeckoResponse";

export class CoinGeckoClient implements PriceProvider {

    constructor(
        private readonly httpClient: HttpClient
    ) {}

    private readonly coinGeckoIds: Record<Coin, string> = {
    BTC: "bitcoin",
    ETH: "ethereum",
    SOL: "solana"
    };
    
    async getPrice(coin: Coin): Promise<number> {

        const coinGeckoId = coinGeckoIds[coin];
        
        const url = `https://api.coingecko.com/api/v3/simple/price` + `?ids=${coinGeckoId}&vs_currencies=usd`;

        const data = await this.httpClient.get<CoinGeckoResponse>(url);

        return data[coinGeckoId].usd;
    }
}
