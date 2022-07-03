import { Handlers } from "$fresh/server.ts";
import { SecretsRepository } from "../../../repositories/Secrets.repository.impl.ts";

const repository = new SecretsRepository();
export const handler: Handlers = {
  async GET(_, ctx) {
    try {
      const { id } = ctx.params;
      const secret = await repository.getById(id);

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
