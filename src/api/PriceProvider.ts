import { Coin } from "../models/Coin";

export interface PriceProvider {

    getPrice(
        coin: Coin
    ): Promise<number>;

}
