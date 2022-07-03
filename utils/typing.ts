export interface Secret {
  id: string;
  description: string;
  created_at: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
}

export type CustomDatabaseReturn = Secret &
  Comment & {
    c_id: number;
    c_created_at: string;
    c_secret_id: string;
  };

export type SecretParsed = Secret & { comments: Comment[] };
