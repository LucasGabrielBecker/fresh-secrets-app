import { Handlers } from "$fresh/server.ts";
import Pg from "../../../../utils/database.ts";

export const handler: Handlers = {
  async POST(_, ctx) {
    try {
      await Pg.startClient();
      const { id } = ctx.params;
      await Pg.deleteById(id);
      return Response.redirect(Deno.env.get("HOST") as string, 302);
    } catch (error) {
      return new Response(JSON.stringify(error), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
