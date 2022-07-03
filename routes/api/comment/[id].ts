import { Handlers } from "$fresh/server.ts";
import { CommentRepository } from "../../../repositories/Comment.repository.impl.ts";
const repository = new CommentRepository();
export const handler: Handlers = {
  async POST(request, ctx) {
    try {
      const { id } = ctx.params;
      const formData = await request.formData();
      const comment = formData.get("comment") as string;
      await repository.addComment(id, comment);
      return Response.redirect(Deno.env.get("HOST") as string);
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify(error), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
