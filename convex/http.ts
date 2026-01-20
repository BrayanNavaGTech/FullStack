import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/stripe-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.text();
    const event = JSON.parse(body);

    if (event.type === "checkout.session.completed") {
      const clerkId = event.data.object.metadata.clerkId;
      await ctx.runMutation(internal.users.updateRoleInternal, {
        clerkId,
        newRole: "admin",
      });
    }

    return new Response(null, { status: 200 });
  }),
});

export default http;