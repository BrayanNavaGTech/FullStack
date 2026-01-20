import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    nombre: v.string(),
    email: v.string(),
    role: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  todos: defineTable({
    titulo: v.string(),
    completada: v.boolean(),
    userId: v.string(),
  }).index("by_user", ["userId"]),
});