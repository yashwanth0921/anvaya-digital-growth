"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";
import { google } from "googleapis";

const BUSINESS_EMAIL = "yashwanth0921@gmail.com";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ]);
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
    const results = { emailSent: false, sheetAppended: false };

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
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Service</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.service}</td></tr>`,
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Date</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.preferredDate}</td></tr>`,
          `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Time</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.preferredTime}</td></tr>`,
        ].filter(Boolean).join("");

        const notesBlock = args.notes
          ? `<div style="background:#F9EEE4;border-radius:12px;padding:16px 20px;margin-bottom:24px;"><div style="font-size:11px;color:#B28452;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Notes</div><p style="margin:0;font-size:14px;color:#430D12;line-height:1.6;">${args.notes}</p></div>`
          : "";

        await withTimeout(
          resend.emails.send({
            from,
            to: BUSINESS_EMAIL,
            subject: `📅 New Booking: ${args.name} — ${args.service} on ${args.preferredDate}`,
            html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#F9EEE4;font-family:Georgia,serif;"><div style="max-width:600px;margin:0 auto;padding:40px 24px;"><div style="text-align:center;margin-bottom:32px;"><div style="font-size:11px;letter-spacing:3px;color:#B28452;text-transform:uppercase;">Grow With</div><div style="font-size:28px;font-weight:800;color:#691E2A;letter-spacing:4px;">ANVAYA</div></div><div style="background:#fff;border-radius:16px;padding:40px 32px;"><h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#691E2A;text-align:center;">📅 New Booking Received</h1><div style="background:#F9EEE4;border-radius:12px;padding:20px 24px;margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;">${details}</table></div>${notesBlock}<div style="text-align:center;"><a href="mailto:${args.email}?subject=Re: ${args.service} consultation" style="display:inline-block;padding:12px 32px;background:#691E2A;color:#fff;border-radius:12px;text-decoration:none;font-weight:600;">Reply to ${args.name.split(" ")[0]}</a></div></div></div></body></html>`,
          }),
          15000
        );
        results.emailSent = true;
        console.log("Booking notification email sent to", BUSINESS_EMAIL);
      } catch (e: any) {
        console.error("Booking email failed:", e.message);
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
        const date = new Date().toLocaleString("en-IN", {
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
                "Booking",
                args.name,
                args.email,
                args.phone || "",
                "",
                args.service,
                `${args.preferredDate} at ${args.preferredTime}`,
                args.notes || "",
              ]],
            },
          }),
          15000
        );
        results.sheetAppended = true;
        console.log("Booking appended to Google Sheet");
      } catch (e: any) {
        console.error("Google Sheet failed:", e.message);
      }
    }

    return results;
  },
});
