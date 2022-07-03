import { ICommentRepository } from "./Comment.repository.ts";
import pool from "../utils/connection.ts";
export class CommentRepository implements ICommentRepository {
  async upvote(id: string): Promise<void> {
    const connection = await pool.connect();
    try {
      const { rows: comment } = await connection.queryObject<{
        upvotes: number;
      }>(`select upvotes from comments where id = '${id}'`);
      console.log({ comment });
      await connection.queryObject(
        `update comments set upvotes = ${
          comment[0].upvotes + 1
        } where id = ${id}`
      );
    } catch (error) {
      console.error(error);
      console.log(error.stack);
    } finally {
      connection.release();
    }
  }
  downvote(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
