import { v } from "convex/values";
import { mutation, query, internalMutation, action } from "./_generated/server";
import { Webhook } from "svix";
import { internal } from "./_generated/api";

export const storeUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (user !== null) {
      await ctx.db.patch(user._id, {
        nombre: identity.name ?? "Usuario",
        email: identity.email ?? "",
      });
      return user._id;
    }

    return await ctx.db.insert("users", {
      tokenIdentifier: identity.subject,
      nombre: identity.name ?? "Usuario",
      email: identity.email ?? "",
      role: "user",
    });
  },
});

export const getMyRole = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return "user";

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    return user?.role ?? "user";
  },
});

export const listAllUsers = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("No autenticado");

    const adminRecord = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (adminRecord?.role !== "admin") {
      throw new Error("Acceso denegado");
    }

    return await ctx.db.query("users").collect();
  },
});

export const updateRole = mutation({
  args: { userId: v.id("users"), newRole: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("No autenticado");

    const adminRecord = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (adminRecord?.role !== "admin") {
      throw new Error("Acceso denegado");
    }

    if (adminRecord._id === args.userId && args.newRole !== "admin") {
      throw new Error("No puedes quitarte el rol de administrador a ti mismo por seguridad");
    }

    await ctx.db.patch(args.userId, { role: args.newRole });
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() },
  handler: async (ctx, args) => {
    const { id, first_name, last_name, email_addresses } = args.data;
    const email = email_addresses[0]?.email_address;
    const nombre = `${first_name ?? ""} ${last_name ?? ""}`.trim();

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", id))
      .unique();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, { nombre, email });
    } else {
      await ctx.db.insert("users", {
        tokenIdentifier: id,
        nombre: nombre || "Usuario",
        email: email || "",
        role: "user",
      });
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.clerkId))
      .unique();

    if (user) {
      await ctx.db.delete(user._id);
    }
  },
});

export const handleWebhook = action({
  args: {
    signature: v.string(),
    timestamp: v.string(),
    id: v.string(),
    payload: v.string(),
  },
  handler: async (ctx, args) => {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) throw new Error("CLERK_WEBHOOK_SECRET no configurada");

    const receiver = new Webhook(secret);
    const payload = receiver.verify(args.payload, {
      "svix-id": args.id,
      "svix-timestamp": args.timestamp,
      "svix-signature": args.signature,
    }) as any;

    if (payload.type === "user.created" || payload.type === "user.updated") {
      await ctx.runMutation(internal.users.upsertFromClerk, { data: payload.data });
    }

    if (payload.type === "user.deleted") {
      const clerkId = payload.data.id;
      await ctx.runMutation(internal.users.deleteFromClerk, { clerkId });
    }

    return payload;
  },
});

export const updateRoleInternal = internalMutation({
  args: { clerkId: v.string(), newRole: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.clerkId))
      .unique();
    if (user) {
      await ctx.db.patch(user._id, { role: args.newRole });
    }
  },
});