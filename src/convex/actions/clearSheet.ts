"use node";

import { action } from "../_generated/server";
import { google } from "googleapis";

export const clearAndFixSheet = action({
  args: {},
  handler: async () => {
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!credentialsJson || !sheetId) return { error: "Missing config" };

    try {
      const credentials = JSON.parse(credentialsJson);
      const auth = new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
      const sheets = google.sheets({ version: "v4", auth });

      // Set correct headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: "Sheet1!A1:I1",
        valueInputOption: "RAW",
        requestBody: {
          values: [["Date", "Type", "Name", "Email", "Phone", "Business", "Service", "Details", "Message"]],
        },
      });

      // Clear all old data rows
      await sheets.spreadsheets.values.clear({
        spreadsheetId: sheetId,
        range: "Sheet1!A2:I200",
      });

      return { success: true, message: "Sheet cleaned and headers set" };
    } catch (e: any) {
      return { error: e.message };
    }
  },
});
