import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    businessName: v.optional(v.string()),
    service: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const leadId = await ctx.db.insert("leads", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      businessName: args.businessName,
      service: args.service,
      message: args.message,
      createdAt: Date.now(),
    });

    // Fire-and-forget email action — don't block the mutation
    ctx.scheduler.runAfter(0, api.actions.sendEmails.sendLeadEmails, {
      name: args.name,
      email: args.email,
      phone: args.phone,
      businessName: args.businessName,
      service: args.service,
      message: args.message,
    });

    return leadId;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("leads")
      .withIndex("by_created")
      .collect();
  },
});
