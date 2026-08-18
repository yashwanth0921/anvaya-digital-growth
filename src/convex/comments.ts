import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    serviceSlug: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to comment.");
    const user = await ctx.db.get(identity.subject as any);
    const userName = (user as any)?.name ?? "Anonymous";
    const commentId = await ctx.db.insert("comments", {
      userId: identity.subject,
      userName,
      serviceSlug: args.serviceSlug,
      text: args.text,
      createdAt: Date.now(),
    });
    return commentId;
  },
});

export const listByService = query({
  args: {
    serviceSlug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .withIndex("by_service", (q) => q.eq("serviceSlug", args.serviceSlug))
      .order("desc")
      .collect();
  },
});
