export interface ICommentRepository {
  upvote(id: string): Promise<void>;
  downvote(id: string): Promise<void>;
  addComment(secretId: string, comment: string): Promise<void>;
}
