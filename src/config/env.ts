import { z } from "zod";

const envSchema = z.object({

    GOOGLE_SPREADSHEET_ID:
        z.string().min(1),

    GOOGLE_SERVICE_ACCOUNT:
        z.string().min(1),

});

export const env =
    envSchema.parse(process.env);
