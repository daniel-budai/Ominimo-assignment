import api from './api';
import type { Comment, CommentData } from '../types/models';
import type { ApiResponse } from '../types/api';

interface CommentsService {
  addComment(postId: number | string, commentData: CommentData): Promise<ApiResponse<Comment>>;
  deleteComment(commentId: number | string): Promise<ApiResponse<void>>;
}

const commentsService: CommentsService = {
  /**
   * Add a comment to a post
   * @param postId - Post ID
   * @param commentData - Comment data
   * @returns API response
   */
  addComment(postId: number | string, commentData: CommentData): Promise<ApiResponse<Comment>> {
    return api.post(`/posts/${postId}/comments`, commentData);
  },
  
  /**
   * Delete a comment
   * @param commentId - Comment ID
   * @returns API response
   */
  deleteComment(commentId: number | string): Promise<ApiResponse<void>> {
    return api.delete(`/comments/${commentId}`);
  }
};

export default commentsService;
