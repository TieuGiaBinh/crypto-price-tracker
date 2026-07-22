import { CoinPrice } from "../models/CoinPrice";
import { PriceRepository } from "../repositories/PriceRepository";

export class PriceTrackerService {

    constructor(

        private readonly repository: PriceRepository

    ) {}

    async save(price: CoinPrice): Promise<void> {

        await this.repository.save(price);

    }

}
