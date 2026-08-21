"use node";

import { action } from "../_generated/server";
import { google } from "googleapis";

export const testSheetWrite = action({
  args: {},
  handler: async () => {
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!credentialsJson) return { error: "No GOOGLE_SERVICE_ACCOUNT_JSON" };
    if (!sheetId) return { error: "No GOOGLE_SHEET_ID" };
    
    const credentials = JSON.parse(credentialsJson);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    
    // First try reading
    try {
      const readResult = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: "Sheet1!A1:A2",
      });
      return { readSuccess: true, rows: readResult.data.values };
    } catch (e: any) {
      return { readError: e.message };
    }
  },
});
