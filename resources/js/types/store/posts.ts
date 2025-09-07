import type { Post, PostData, Comment, CommentData } from '../models';

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

export interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination;
}

export interface PostsGetters {
  getAllPosts: Post[];
  getCurrentPost: Post | null;
  isLoading: boolean;
  getError: string | null;
  getPagination: Pagination;
}

export interface PostsActions {
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setPagination: (pagination: Partial<Pagination>) => void;
  fetchPosts: (params?: Record<string, any>) => Promise<Post[]>;
  fetchPost: (id: number | string) => Promise<Post>;
  createPost: (postData: PostData) => Promise<Post>;
  updatePost: (id: number | string, postData: PostData) => Promise<Post>;
  deletePost: (id: number | string) => Promise<boolean>;
  addComment: (postId: number | string, commentData: CommentData) => Promise<Comment>;
  deleteComment: (postId: number | string, commentId: number | string) => Promise<boolean>;
}
