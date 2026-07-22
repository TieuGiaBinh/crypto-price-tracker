import { CoinPrice } from "../models/CoinPrice";
import { PriceRepository } from "./PriceRepository";

export class GoogleSheetsRepository
    implements PriceRepository {

    async save(price: CoinPrice): Promise<void> {

        console.log(price);

    }

}
