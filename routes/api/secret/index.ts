import { Handlers } from "$fresh/server.ts";
import Pg from "../../../utils/database.ts";

export const handler: Handlers = {
  async GET(request) {
    await Pg.startClient();
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const q = params.get("q");
    const itens = q ? await Pg.getByMatchingValue(q) : await Pg.getAll();

    return new Response(JSON.stringify(itens), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async POST(request, ctx) {
    console.log({ request, ctx });
    return Response.redirect("http://localhost:8000");
  },
};
