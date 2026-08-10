import { CoinPrice } from "../models/CoinPrice";
import { PriceRepository } from "./PriceRepository";
import { GoogleSheetsClient } from "../google/GoogleSheetsClient"

export class GoogleSheetsRepository
    implements PriceRepository {

    constructor(
        private readonly client : GoogleSheetsClient,
        private readonly speadsheetId : string
    ){}

    async save(price: CoinPrice): Promise<void> {

        await this.client.appendRow(

            this.speadsheetID,

            "Sheet1!A:C",
            [
                price.timestamp.toISOSstring(),
                price.coin,
                price.price
            ]
        );

    }

}
