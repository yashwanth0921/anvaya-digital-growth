"use node";

import { action } from "../_generated/server";

export const checkEnv = action({
  args: {},
  handler: async () => {
    const resendKey = process.env.RESEND_API_KEY;
    const googleJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    const result: Record<string, any> = {
      resendKeyPresent: !!resendKey,
      resendKeyLength: resendKey?.length ?? 0,
      googleJsonPresent: !!googleJson,
      googleJsonLength: googleJson?.length ?? 0,
      sheetIdPresent: !!sheetId,
      sheetIdValue: sheetId ?? "NOT_SET",
      googleJsonParsed: false,
      googleJsonParseError: null as string | null,
    };

    // Test if Google JSON is valid
    if (googleJson) {
      try {
        const parsed = JSON.parse(googleJson);
        result.googleJsonParsed = true;
        result.serviceAccountEmail = parsed.client_email ?? "MISSING";
        result.projectId = parsed.project_id ?? "MISSING";
      } catch (e: any) {
        result.googleJsonParseError = e.message;
      }
    }

    // Test Resend connection
    if (resendKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        // Just check if we can list domains (a lightweight API call)
        result.resendConnectionTest = "Key present, will attempt send on form submit";
      } catch (e: any) {
        result.resendConnectionError = e.message;
      }
    }

    // Test Google Sheets connection
    if (googleJson && sheetId) {
      try {
        const { google } = await import("googleapis");
        const credentials = JSON.parse(googleJson);
        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        const sheets = google.sheets({ version: "v4", auth });
        // Try to read sheet metadata to verify access
        const metadata = await sheets.spreadsheets.get({
          spreadsheetId: sheetId,
          fields: "properties.title",
        });
        result.sheetsAccessTest = "SUCCESS";
        result.sheetTitle = metadata.data.properties?.title ?? "UNKNOWN";
      } catch (e: any) {
        result.sheetsAccessTest = "FAILED";
        result.sheetsAccessError = e.message;
      }
    }

    return result;
  },
});
