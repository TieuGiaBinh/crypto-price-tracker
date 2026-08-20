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

            this.speadsheetId,

            "Sheet1!A:C",
            [
                price.timestamp.toISOString(),
                price.coin,
                price.price
            ]
        );

    }

}
