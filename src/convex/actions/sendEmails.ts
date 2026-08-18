"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

// Business owner email — where notifications go
const BUSINESS_EMAIL = "growwithanvaya@gmail.com";

export const sendLeadEmails = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    businessName: v.optional(v.string()),
    service: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = "Grow with Anvaya <onboarding@resend.dev>";

    // 1. Confirmation email to the lead
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background-color:#F9EEE4;font-family:Georgia,'Times New Roman',serif;">
        <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:11px;letter-spacing:3px;color:#B28452;text-transform:uppercase;margin-bottom:4px;">Grow With</div>
            <div style="font-size:28px;font-weight:800;color:#691E2A;letter-spacing:4px;">ANVAYA</div>
          </div>

          <div style="background:#ffffff;border-radius:16px;padding:40px 32px;border:1px solid rgba(105,30,42,0.08);">
            <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#691E2A;">
              Thank you, ${args.name}! 🎉
            </h1>
            <p style="margin:0 0 24px;font-size:15px;color:#666;line-height:1.7;">
              We've received your inquiry for <strong style="color:#691E2A;">${args.service}</strong> and our team is already reviewing your details.
            </p>

            <div style="background:#F9EEE4;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
              <h3 style="margin:0 0 12px;font-size:13px;color:#B28452;text-transform:uppercase;letter-spacing:1.5px;">Your Submission Details</h3>
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Name</td>
                  <td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.name}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Email</td>
                  <td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.email}</td>
                </tr>
                ${args.phone ? `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Phone</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.phone}</td></tr>` : ""}
                ${args.businessName ? `<tr><td style="padding:6px 0;font-size:13px;color:#999;">Business</td><td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.businessName}</td></tr>` : ""}
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Service</td>
                  <td style="padding:6px 0;font-size:13px;color:#430D12;font-weight:600;text-align:right;">${args.service}</td>
                </tr>
              </table>
            </div>

            <p style="margin:0 0 24px;font-size:15px;color:#666;line-height:1.7;">
              Our team will reach out within <strong style="color:#691E2A;">24 hours</strong> with a tailored growth plan for your business. In the meantime, feel free to reply to this email with any additional details.
            </p>

            <div style="text-align:center;margin-top:32px;">
              <a href="https://growwithanvaya.com" style="display:inline-block;padding:12px 32px;background-color:#691E2A;color:#ffffff;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">Visit Our Website</a>
            </div>
          </div>

          <div style="text-align:center;margin-top:32px;">
            <p style="margin:0;font-size:11px;color:#B28452;letter-spacing:2px;text-transform:uppercase;">Strategy. Growth. Impact.</p>
            <p style="margin:8px 0 0;font-size:11px;color:#999;">© ${new Date().getFullYear()} Grow with Anvaya. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Notification email to business owner
    const notificationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background-color:#F9EEE4;font-family:Georgia,'Times New Roman',serif;">
        <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:11px;letter-spacing:3px;color:#B28452;text-transform:uppercase;margin-bottom:4px;">Grow With</div>
            <div style="font-size:28px;font-weight:800;color:#691E2A;letter-spacing:4px;">ANVAYA</div>
          </div>

          <div style="background:#ffffff;border-radius:16px;padding:40px 32px;border:1px solid rgba(105,30,42,0.08);">
            <div style="text-align:center;margin-bottom:24px;">
              <div style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#691E2A;color:#ffffff;font-size:22px;font-weight:700;line-height:48px;">📩</div>
            </div>

            <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#691E2A;text-align:center;">
              New Lead Received
            </h1>
            <p style="margin:0 0 24px;font-size:14px;color:#999;text-align:center;">
              A new inquiry was submitted through your website
            </p>

            <div style="background:#F9EEE4;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;font-size:13px;color:#999;width:120px;">Name</td>
                  <td style="padding:8px 0;font-size:14px;color:#430D12;font-weight:600;">${args.name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:13px;color:#999;">Email</td>
                  <td style="padding:8px 0;font-size:14px;color:#430D12;font-weight:600;"><a href="mailto:${args.email}" style="color:#691E2A;text-decoration:none;">${args.email}</a></td>
                </tr>
                ${args.phone ? `<tr><td style="padding:8px 0;font-size:13px;color:#999;">Phone</td><td style="padding:8px 0;font-size:14px;color:#430D12;font-weight:600;"><a href="tel:${args.phone}" style="color:#691E2A;text-decoration:none;">${args.phone}</a></td></tr>` : ""}
                ${args.businessName ? `<tr><td style="padding:8px 0;font-size:13px;color:#999;">Business</td><td style="padding:8px 0;font-size:14px;color:#430D12;font-weight:600;">${args.businessName}</td></tr>` : ""}
                <tr>
                  <td style="padding:8px 0;font-size:13px;color:#999;">Service</td>
                  <td style="padding:8px 0;font-size:14px;color:#691E2A;font-weight:700;">${args.service}</td>
                </tr>
              </table>
            </div>

            ${args.message ? `
            <div style="background:#F9EEE4;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
              <div style="font-size:11px;color:#B28452;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Message</div>
              <p style="margin:0;font-size:14px;color:#430D12;line-height:1.6;">${args.message}</p>
            </div>
            ` : ""}

            <div style="text-align:center;">
              <a href="mailto:${args.email}?subject=Re: Your inquiry for ${args.service} — Grow with Anvaya" style="display:inline-block;padding:12px 32px;background-color:#691E2A;color:#ffffff;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">Reply to ${args.name.split(" ")[0]}</a>
            </div>
          </div>

          <div style="text-align:center;margin-top:24px;">
            <p style="margin:0;font-size:11px;color:#999;">This is an automated notification from your website lead form.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send both emails in parallel
    const results = await Promise.allSettled([
      resend.emails.send({
        from: fromEmail,
        to: args.email,
        subject: `Thank you for reaching out, ${args.name}! — Grow with Anvaya`,
        html: confirmationHtml,
      }),
      resend.emails.send({
        from: fromEmail,
        to: BUSINESS_EMAIL,
        subject: `📩 New Lead: ${args.name} — ${args.service}`,
        html: notificationHtml,
      }),
    ]);

    const confirmation = results[0];
    const notification = results[1];

    return {
      confirmationSent: confirmation.status === "fulfilled",
      notificationSent: notification.status === "fulfilled",
      confirmationError: confirmation.status === "rejected" ? String(confirmation.reason) : null,
      notificationError: notification.status === "rejected" ? String(notification.reason) : null,
    };
  },
});
