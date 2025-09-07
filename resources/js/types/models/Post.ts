import type { User } from './User';
import type { Comment } from './Comment';

export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  user?: User;
  comments?: Comment[];
  comments_count?: number;
}

export interface PostData {
  title: string;
  content: string;
}
