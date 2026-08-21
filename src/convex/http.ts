import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

auth.addHttpRoutes(http);

// Diagnostic endpoint — hit /api/diagnose to check env vars and integrations
http.route({
  path: "/diagnose",
  method: "GET",
  handler: httpAction(async (ctx) => {
    try {
      const results = await ctx.runAction(api.actions.diagnose.checkEnv, {});
      return new Response(JSON.stringify(results, null, 2), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: any) {
      return new Response(
        JSON.stringify({ error: e.message || String(e) }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

export default http;
