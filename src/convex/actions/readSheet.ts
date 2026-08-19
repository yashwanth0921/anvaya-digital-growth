"use node";

import { action } from "../_generated/server";
import { google } from "googleapis";

export const readSheet = action({
  args: {},
  handler: async () => {
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!credentialsJson || !sheetId) return { error: "Missing config" };
    try {
      const credentials = JSON.parse(credentialsJson);
      const auth = new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
      const sheets = google.sheets({ version: "v4", auth });
      const res = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "Sheet1!A1:Z10" });
      return { values: res.data.values || [] };
    } catch (e: any) {
      return { error: e.message };
    }
  },
});
