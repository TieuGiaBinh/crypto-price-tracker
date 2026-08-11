import { google, sheets_v4 } from "googleapis";
import fs from "node:fs";

export class GoogleSheetsClient {

    private readonly client: sheets_v4.Sheets;

    constructor(credentialsJson: string) {

        const credentials =
            JSON.parse(credentialsJson)
            );

        const auth =
            new google.auth.GoogleAuth({
                credentials,
                scopes: [
                    "https://www.googleapis.com/auth/spreadsheets"
                ]
            });

        this.client =
            google.sheets({
                version: "v4",
                auth
            });
    }

    async appendRow(
        spreadsheetId: string,
        range: string,
        values: (string | number)[]
    ): Promise<void> {

        await this.client.spreadsheets.values.append({

            spreadsheetId,

            range,

            valueInputOption: "USER_ENTERED",

            requestBody: {
                values: [
                    values
                ]
            }

        });
    }
}
