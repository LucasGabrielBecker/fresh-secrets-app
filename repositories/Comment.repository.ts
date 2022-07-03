export interface ICommentRepository {
  upvote(id: string): Promise<void>;
  downvote(id: string): Promise<void>;
}
