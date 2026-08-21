"use node";

import { action } from "../_generated/server";
import { api } from "../_generated/api";
import { v } from "convex/values";
import { Resend } from "resend";
import { google } from "googleapis";

const BUSINESS_EMAIL = "growwithanvaya@gmail.com";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ]);
}

export const submitAndNotify = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    businessName: v.optional(v.string()),
    service: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    const results: {
      emailSent: boolean;
      sheetAppended: boolean;
      emailError?: string;
      sheetError?: string;
      resendKeyPresent: boolean;
      googleJsonPresent: boolean;
      sheetIdPresent: boolean;
    } = {
      emailSent: false,
      sheetAppended: false,
      resendKeyPresent: !!process.env.RESEND_API_KEY,
      googleJsonPresent: !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
      sheetIdPresent: !!process.env.GOOGLE_SHEET_ID,
    };

    // Send notification email to business owner
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const from = "Grow with Anvaya <onboarding@resend.dev>";

        const details = [
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Name</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.name}</td></tr>`,
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Email</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.email}</td></tr>`,
          args.phone ? `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Phone</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.phone}</td></tr>` : "",
          args.businessName ? `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Business</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.businessName}</td></tr>` : "",
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Service</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.service}</td></tr>`,
        ].filter(Boolean).join("");

        const msgBlock = args.message
          ? `<div style="background:#F9EEE4;border-radius:12px;padding:16px 20px;margin-bottom:24px;"><div style="font-size:11px;color:#B28452;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Message</div><p style="margin:0;font-size:14px;color:#430D12;line-height:1.6;">${args.message}</p></div>`
          : "";

        await withTimeout(
          resend.emails.send({
            from,
            to: BUSINESS_EMAIL,
            subject: `📩 New Lead: ${args.name} — ${args.service}`,
            html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#F9EEE4;font-family:Georgia,serif;"><div style="max-width:600px;margin:0 auto;padding:40px 24px;"><div style="text-align:center;margin-bottom:32px;"><div style="font-size:11px;letter-spacing:3px;color:#B28452;text-transform:uppercase;">Grow With</div><div style="font-size:28px;font-weight:800;color:#691E2A;letter-spacing:4px;">ANVAYA</div></div><div style="background:#fff;border-radius:16px;padding:40px 32px;"><h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#691E2A;text-align:center;">📩 New Lead Received</h1><div style="background:#F9EEE4;border-radius:12px;padding:20px 24px;margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;">${details}</table></div>${msgBlock}<div style="text-align:center;"><a href="mailto:${args.email}?subject=Re: ${args.service}" style="display:inline-block;padding:12px 32px;background:#691E2A;color:#fff;border-radius:12px;text-decoration:none;font-weight:600;">Reply to ${args.name.split(" ")[0]}</a></div></div></div></body></html>`,
          }),
          15000
        );
        results.emailSent = true;
      } catch (e: any) {
        results.emailError = e.message || String(e);
        console.error("Lead email failed:", e.message);
      }
    }

    // Append to Google Sheet
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
        const date = new Date(timestamp).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        await withTimeout(
          sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: "Sheet1!A:I",
            valueInputOption: "RAW",
            requestBody: {
              values: [[
                date,
                "Lead",
                args.name,
                args.email,
                args.phone || "",
                args.businessName || "",
                args.service,
                "",
                args.message || "",
              ]],
            },
          }),
          15000
        );
        results.sheetAppended = true;
      } catch (e: any) {
        results.sheetError = e.message || String(e);
        console.error("Google Sheet failed:", e.message);
      }
    }

    // Store diagnostic info in DB so we can see what happened
    try {
      await ctx.runMutation(api.diagnostics.store, { results });
    } catch (e) {
      console.error("Failed to store diagnostics:", e);
    }

    return results;
  },
});
