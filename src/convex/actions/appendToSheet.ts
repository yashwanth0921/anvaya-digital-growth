"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { google } from "googleapis";

export const appendLeadToSheet = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    businessName: v.optional(v.string()),
    service: v.string(),
    message: v.optional(v.string()),
    createdAt: v.number(),
  },
  handler: async (_ctx, args) => {
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!credentialsJson || !sheetId) {
      console.error("Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SHEET_ID env vars");
      return { success: false, error: "Missing Google Sheets configuration" };
    }

    try {
      const credentials = JSON.parse(credentialsJson);

      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      const date = new Date(args.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:G",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              date,
              args.name,
              args.email,
              args.phone || "",
              args.businessName || "",
              args.service,
              args.message || "",
            ],
          ],
        },
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to append to Google Sheet:", error);
      return { success: false, error: String(error) };
    }
  },
});
