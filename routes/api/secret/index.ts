import { Handlers } from "$fresh/server.ts";
import { SecretsRepository } from "../../../repositories/Secrets.repository.impl.ts";

const repository = new SecretsRepository();
export const handler: Handlers = {
  async GET(request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const q = params.get("q");
    console.log({ params });
    const itens = q
      ? await repository.getByMatchingValue(q)
      : await repository.getAll();

    return new Response(JSON.stringify(itens), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
