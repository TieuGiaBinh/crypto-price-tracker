console.log("Crypto Price Tracker started...");
import { GoogleSheetsRepository } from "./repositories/GoogleSheetsRepository";
import { PriceTrackerService } from "./services/PriceTrackerService";

const repository = new GoogleSheetsRepository();

const service = new PriceTrackerService(repository);
