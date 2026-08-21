"use node";

import { action } from "../_generated/server";

export const testResend = action({
  args: {},
  handler: async () => {
    const key = process.env.RESEND_API_KEY;
    if (!key) return { error: "No RESEND_API_KEY set" };
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      const result = await resend.emails.send({
        from: "Grow with Anvaya <onboarding@resend.dev>",
        to: "growwithanvaya@gmail.com",
        subject: "Test Email from Grow with Anvaya",
        html: "<h1>Test</h1><p>If you see this, Resend is working!</p>",
      });
      return { success: true, id: result.data?.id, error: result.error };
    } catch (e: any) {
      return { error: e.message };
    }
  },
});
