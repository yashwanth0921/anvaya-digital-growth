import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {
    results: v.any(),
  },
  handler: async (ctx, args) => {
    // Delete old diagnostics first
    const existing = await ctx.db.query("diagnostics").collect();
    for (const doc of existing) {
      await ctx.db.delete(doc._id);
    }
    const id = await ctx.db.insert("diagnostics", {
      results: args.results,
      createdAt: Date.now(),
    });
    return id;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("diagnostics").order("desc").collect();
    return docs[0] ?? null;
  },
});
