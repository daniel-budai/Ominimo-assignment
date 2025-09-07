import type { User } from './User';
import type { Post } from './Post';

export interface Comment {
  id: number;
  comment: string;
  post_id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  user?: User;
  post?: Post;
}

export interface CommentData {
  comment: string;
  post_id?: number;
}
