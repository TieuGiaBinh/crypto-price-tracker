console.log("Crypto Price Tracker started...");
import { GoogleSheetsRepository } from "./repositories/GoogleSheetsRepository";
import { PriceTrackerService } from "./services/PriceTrackerService";
import { FetchHttpCLient } from "./api/FetchHttpClient"
import { CoinGeckoClient } from "./api/CoinGeckoClient"
import { GoogleSheetsClient } from ".google/GoogleSheetsClient"

const googlesheetsclient = new GoogleSheetsClient("./credentials/service-account.json");

const repository = new GoogleSheetsRepository(googlesheetsclient, "YOUR_SPREADSHEET_ID");

const httpClient = new FetchHttpClient();

const priceProvider = new CoinGeckoClient(httpClient);

const service = new PriceTrackerService(repository, priceProvider);

await service.track("BTC");
