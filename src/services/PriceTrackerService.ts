import {Coin} from "../models/Coin"
import { CoinPrice } from "../models/CoinPrice";
import {PriceProvider} from "../api/PriceProvider"
import { PriceRepository } from "../repositories/PriceRepository";

export class PriceTrackerService {

    constructor(

        private readonly repository: PriceRepository,
        private readonly priceProvider: PriceProvider

    ) {}

    async track(coin: Coin): Promise<void> {

        const price = await this.priceProvider.getPrice(coin);

        const coinPrice: CoinPrice ={
            timestamp = new Date(),
            coin,
            price
        };
        
        await this.repository.save(coinPrice);

    }

}
