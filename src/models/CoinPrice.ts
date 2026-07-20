import { Coin } from "./Coin";

export interface CoinPrice {

    timestamp: Date;

    coin: Coin;

    price: number;

}