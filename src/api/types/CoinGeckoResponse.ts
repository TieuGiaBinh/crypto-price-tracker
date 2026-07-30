export interface CoinGeckoResponse {
    [coin: string]: {
        usd: number;
    };
}
