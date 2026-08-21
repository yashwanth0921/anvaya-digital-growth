"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import * as crypto from "crypto";

const BUSINESS_EMAIL = "growwithanvaya@gmail.com";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ]);
}

async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  html: string,
  from: string
): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API ${res.status}: ${body}`);
  }
  return true;
}

async function getGoogleAccessToken(credentialsJson: string): Promise<string> {
  const creds = JSON.parse(credentialsJson);
  const now = Math.floor(Date.now() / 1000);

  // Build JWT
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
  const privateKey = creds.private_key;
  const signature = sign.sign(privateKey, "base64url");

  const jwt = `${header}.${payload}.${signature}`;

  // Exchange JWT for access token
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

  const tokenData = await tokenRes.json() as { access_token: string };
  return tokenData.access_token;
}

async function appendToSheet(
  accessToken: string,
  sheetId: string,
  values: string[]
): Promise<boolean> {
  const date = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:I:append?valueInputOption=RAW`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [[date, ...values]],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets API ${res.status}: ${body}`);
  }
  return true;
}

export const sendBookingNotifications = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    service: v.string(),
    preferredDate: v.string(),
    preferredTime: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const results = { emailSent: false, sheetAppended: false, errors: [] as string[] };

    // Send notification email to business owner
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const details = [
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Name</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.name}</td></tr>`,
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Email</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.email}</td></tr>`,
          args.phone ? `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Phone</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.phone}</td></tr>` : "",
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Service</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.service}</td></tr>`,
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Date</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.preferredDate}</td></tr>`,
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Time</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.preferredTime}</td></tr>`,
        ].filter(Boolean).join("");

        const notesBlock = args.notes
          ? `<div style="background:#F9EEE4;border-radius:12px;padding:16px 20px;margin-bottom:24px;"><div style="font-size:11px;color:#B28452;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Notes</div><p style="margin:0;font-size:14px;color:#430D12;line-height:1.6;">${args.notes}</p></div>`
          : "";

        await withTimeout(
          sendEmail(
            resendKey,
            BUSINESS_EMAIL,
            `📅 New Booking: ${args.name} — ${args.service} on ${args.preferredDate}`,
            `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#F9EEE4;font-family:Georgia,serif;"><div style="max-width:600px;margin:0 auto;padding:40px 24px;"><div style="text-align:center;margin-bottom:32px;"><div style="font-size:11px;letter-spacing:3px;color:#B28452;text-transform:uppercase;">Grow With</div><div style="font-size:28px;font-weight:800;color:#691E2A;letter-spacing:4px;">ANVAYA</div></div><div style="background:#fff;border-radius:16px;padding:40px 32px;"><h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#691E2A;text-align:center;">📅 New Booking Received</h1><div style="background:#F9EEE4;border-radius:12px;padding:20px 24px;margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;">${details}</table></div>${notesBlock}<div style="text-align:center;"><a href="mailto:${args.email}?subject=Re: ${args.service} consultation" style="display:inline-block;padding:12px 32px;background:#691E2A;color:#fff;border-radius:12px;text-decoration:none;font-weight:600;">Reply to ${args.name.split(" ")[0]}</a></div></div></div></body></html>`,
            "Grow with Anvaya <onboarding@resend.dev>"
          ),
          15000
        );
        results.emailSent = true;
        console.log("✅ Booking notification email sent to", BUSINESS_EMAIL);
      } catch (e: any) {
        const msg = e.message || String(e);
        results.errors.push(`Email: ${msg}`);
        console.error("❌ Booking email failed:", msg);
      }
    } else {
      results.errors.push("Email: RESEND_API_KEY not set");
    }

    // Append to Google Sheet
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (credentialsJson && sheetId) {
      try {
        const accessToken = await withTimeout(
          getGoogleAccessToken(credentialsJson),
          10000
        );

        await withTimeout(
          appendToSheet(accessToken, sheetId, [
            "Booking",
            args.name,
            args.email,
            args.phone || "",
            "",
            args.service,
            `${args.preferredDate} at ${args.preferredTime}`,
            args.notes || "",
          ]),
          15000
        );
        results.sheetAppended = true;
        console.log("✅ Booking appended to Google Sheet");
      } catch (e: any) {
        const msg = e.message || String(e);
        results.errors.push(`Sheet: ${msg}`);
        console.error("❌ Google Sheet failed:", msg);
      }
    } else {
      results.errors.push(`Sheet: Missing env vars (json=${!!credentialsJson}, id=${!!sheetId})`);
    }

    return results;
  },
});
