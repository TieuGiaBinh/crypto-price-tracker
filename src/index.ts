console.log("Crypto Price Tracker started...");
import { GoogleSheetsRepository } from "./repositories/GooglesheetsRepository";
import { PriceTrackerService } from "./services/PriceTrackerService";
import { FetchHttpCLient } from "./api/FetchHttpClient"
import { CoinGeckoClient } from "./api/CoinGeckoClient"
import { GoogleSheetsClient } from "./google/GoogleSheetsClient"

async function main(): Promise<void>{
  
  const googlesheetsclient = new GoogleSheetsClient(process.env.GOOGLE_SERVICE_ACCOUNT!);

  const repository = new GoogleSheetsRepository(googlesheetsclient, process.env.GOOGLE_SPREADSHEET_ID!);

  const httpClient = new FetchHttpClient();

  const priceProvider = new CoinGeckoClient(httpClient);

  const service = new PriceTrackerService(repository, priceProvider);

  await service.track("BTC");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

