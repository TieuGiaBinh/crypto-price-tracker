import { z } from "zod";

const envSchema = z.object({

    GOOGLE_SPREADSHEET_ID:
        z.string().min(1),

    GOOGLE_SERVICE_ACCOUNT:
        z.string()
            .min(1)
            .transform((value) => {

                try {

                    return JSON.parse(value);

                } catch {

                    throw new Error(
                        "GOOGLE_SERVICE_ACCOUNT must be valid JSON"
                    );

                }

            }),

});

export const env =
    envSchema.parse(process.env);
