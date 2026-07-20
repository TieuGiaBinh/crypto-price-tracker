export interface PriceRepository {

    save(price: CoinPrice): Promise<void>;

}