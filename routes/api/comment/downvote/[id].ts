import { Handlers } from "$fresh/server.ts";
import { CommentRepository } from "../../../../repositories/Comment.repository.impl.ts";
const repository = new CommentRepository();
export const handler: Handlers = {
  async POST(_, ctx) {
    try {
      const { id } = ctx.params;
      await repository.downvote(id);
      return Response.redirect(Deno.env.get("HOST") as string);
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify(error), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
