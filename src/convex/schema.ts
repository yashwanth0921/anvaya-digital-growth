import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Lead generation form submissions
    leads: defineTable({
      name: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
      businessName: v.optional(v.string()),
      service: v.string(),
      message: v.optional(v.string()),
      createdAt: v.number(),
    }).index("by_email", ["email"])
      .index("by_created", ["createdAt"]),

    // Client bookings / scheduling requests
    bookings: defineTable({
      userId: v.optional(v.string()),
      name: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
      service: v.string(),
      preferredDate: v.string(),
      preferredTime: v.string(),
      notes: v.optional(v.string()),
      status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("cancelled")),
      createdAt: v.number(),
    }).index("by_user", ["userId"])
      .index("by_created", ["createdAt"])
      .index("by_status", ["status"]),

    // Comments on service detail pages
    comments: defineTable({
      userId: v.string(),
      userName: v.string(),
      serviceSlug: v.string(),
      text: v.string(),
      createdAt: v.number(),
    }).index("by_service", ["serviceSlug", "createdAt"]),

    // Diagnostics for debugging env vars
    diagnostics: defineTable({
      results: v.any(),
      createdAt: v.number(),
    }),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
