import { Handlers } from "$fresh/server.ts";
import Pg from "../../../utils/database.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    try {
      const { id } = ctx.params;
      const secret = await Pg.getById(id);

      return new Response(JSON.stringify(secret), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify(error), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
