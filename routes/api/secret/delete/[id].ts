import { Handlers } from "$fresh/server.ts";
import { SecretsRepository } from "../../../../repositories/Secrets.repository.impl.ts";
const repository = new SecretsRepository();
export const handler: Handlers = {
  async POST(_, ctx) {
    try {
      const { id } = ctx.params;
      await repository.deleteById(id);
      return Response.redirect(Deno.env.get("HOST") as string, 302);
    } catch (error) {
      return new Response(JSON.stringify(error), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
