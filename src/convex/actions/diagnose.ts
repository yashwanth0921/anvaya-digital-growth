"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";
import { google } from "googleapis";

export const checkEnv = action({
  args: {},
  handler: async () => {
    const results: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      env: {
        RESEND_API_KEY: process.env.RESEND_API_KEY
          ? `SET (starts with ${process.env.RESEND_API_KEY.substring(0, 7)}...)`
          : "MISSING",
        GOOGLE_SERVICE_ACCOUNT_JSON: process.env.GOOGLE_SERVICE_ACCOUNT_JSON
          ? `SET (length: ${process.env.GOOGLE_SERVICE_ACCOUNT_JSON.length})`
          : "MISSING",
        GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID
          ? `SET (${process.env.GOOGLE_SHEET_ID})`
          : "MISSING",
      },
      resend: null as unknown,
      googleSheets: null as unknown,
    };

    // Test Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        // Try a lightweight API call to verify the key works
        const domainRes = await resend.domains.list();
        results.resend = {
          status: "API key is valid",
          data: JSON.stringify(domainRes.data),
        };
      } catch (e: any) {
        results.resend = {
          status: "ERROR",
          message: e.message || String(e),
        };
      }
    } else {
      results.resend = { status: "SKIPPED - no API key" };
    }

    // Test Google Sheets
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (credentialsJson && sheetId) {
      try {
        const credentials = JSON.parse(credentialsJson);
        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        const sheets = google.sheets({ version: "v4", auth });

        // Try to read the sheet metadata
        const meta = await sheets.spreadsheets.get({
          spreadsheetId: sheetId,
          fields: "properties.title,sheets.properties",
        });

        const sheetTitle = meta.data.properties?.title ?? "unknown";
        const sheetTabs = meta.data.sheets?.map(
          (s) => s.properties?.title ?? "unnamed"
        ) ?? [];

        // Try to read existing data
        const readRes = await sheets.spreadsheets.values.get({
          spreadsheetId: sheetId,
          range: "Sheet1!A1:J10",
        });

        results.googleSheets = {
          status: "Connected",
          spreadsheetTitle: sheetTitle,
          tabs: sheetTabs,
          existingRows: readRes.data.values?.length ?? 0,
          existingData: readRes.data.values?.slice(0, 5) ?? [],
        };

        // Try to write a test row
        const testDate = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: "Sheet1!A:I",
          valueInputOption: "RAW",
          requestBody: {
            values: [[
              testDate,
              "DIAGNOSTIC",
              "Test Entry",
              "test@example.com",
              "9999999999",
              "Test Business",
              "Test Service",
              "Diagnostic test",
              "This row was created by the diagnostic tool. Delete this row.",
            ]],
          },
        });

        (results as any).googleSheets.wroteTestRow = true;
      } catch (e: any) {
        results.googleSheets = {
          status: "ERROR",
          message: e.message || String(e),
          code: e.code,
        };
      }
    } else {
      results.googleSheets = {
        status: "SKIPPED - missing env vars",
        jsonSet: !!credentialsJson,
        sheetIdSet: !!sheetId,
      };
    }

    // Test sending email
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const sendResult = await resend.emails.send({
          from: "Grow with Anvaya <onboarding@resend.dev>",
          to: "growwithanvaya@gmail.com",
          subject: "🧪 Diagnostic Test — Grow with Anvaya",
          html: "<p>This is a diagnostic test email from Grow with Anvaya. If you received this, email sending is working correctly.</p>",
        });
        (results as any).testEmail = {
          status: "SENT",
          id: sendResult.data?.id,
          error: sendResult.error?.message,
        };
      } catch (e: any) {
        (results as any).testEmail = {
          status: "ERROR",
          message: e.message || String(e),
        };
      }
    }

    return results;
  },
});
