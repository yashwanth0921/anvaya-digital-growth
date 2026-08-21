"use node";

import { action } from "../_generated/server";
import * as crypto from "crypto";
import fetch from "node-fetch";

async function getGoogleAccessToken(credentialsJson: string): Promise<string> {
  const creds = JSON.parse(credentialsJson);
  const now = Math.floor(Date.now() / 1000);

  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      iss: creds.client_email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  ).toString("base64url");

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(creds.private_key, "base64url");
  const jwt = `${header}.${payload}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const body = await tokenRes.text();
    throw new Error(`Google token exchange failed ${tokenRes.status}: ${body}`);
  }

  const tokenData = (await tokenRes.json()) as { access_token: string };
  return tokenData.access_token;
}

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
        const res = await fetch("https://api.resend.com/domains", {
          headers: { Authorization: `Bearer ${resendKey}` },
        });
        const data = await res.json();
        results.resend = {
          status: res.ok ? "API key valid" : `ERROR ${res.status}`,
          data: JSON.stringify(data),
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
        const accessToken = await getGoogleAccessToken(credentialsJson);

        // Read sheet metadata
        const metaRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=properties.title,sheets.properties`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (!metaRes.ok) {
          const body = await metaRes.text();
          results.googleSheets = { status: `ERROR reading metadata: ${metaRes.status}`, message: body };
        } else {
          const meta = await metaRes.json() as any;

          // Try to read existing data
          const readRes = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:J10`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );

          let existingRows = 0;
          let existingData: string[][] = [];
          if (readRes.ok) {
            const readData = (await readRes.json()) as any;
            existingRows = readData.values?.length ?? 0;
            existingData = readData.values?.slice(0, 5) ?? [];
          }

          // Write test row
          const testDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
          const writeRes = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:I:append?valueInputOption=RAW`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
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
              }),
            }
          );

          results.googleSheets = {
            status: "Connected",
            spreadsheetTitle: meta.properties?.title ?? "unknown",
            tabs: meta.sheets?.map((s: any) => s.properties?.title ?? "unnamed") ?? [],
            existingRows,
            existingData,
            wroteTestRow: writeRes.ok,
            writeError: writeRes.ok ? null : await writeRes.text(),
          };
        }
      } catch (e: any) {
        results.googleSheets = {
          status: "ERROR",
          message: e.message || String(e),
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
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Grow with Anvaya <onboarding@resend.dev>",
            to: "growwithanvaya@gmail.com",
            subject: "🧪 Diagnostic Test — Grow with Anvaya",
            html: "<p>This is a diagnostic test email from Grow with Anvaya. If you received this, email sending is working correctly.</p>",
          }),
        });
        const data = await res.json() as any;
        (results as any).testEmail = {
          status: res.ok ? "SENT" : `ERROR ${res.status}`,
          id: data.id,
          error: data.message,
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
