import api from './api';
import type { Post, PostData } from '../types/models';
import type { ApiResponse, PaginatedResponse } from '../types/api';

interface PostsService {
  getAllPosts(params?: Record<string, any>): Promise<ApiResponse<PaginatedResponse<Post>>>;
  getPost(id: number | string): Promise<ApiResponse<Post>>;
  createPost(postData: PostData): Promise<ApiResponse<Post>>;
  updatePost(id: number | string, postData: PostData): Promise<ApiResponse<Post>>;
  deletePost(id: number | string): Promise<ApiResponse<void>>;
}

const postsService: PostsService = {
  /**
   * Get all posts
   * @param params - Query parameters
   * @returns API response
   */
  getAllPosts(params = {}): Promise<ApiResponse<PaginatedResponse<Post>>> {
    return api.get('/posts', { params });
  },
  
  /**
   * Get a specific post by ID
   * @param id - Post ID
   * @returns API response
   */
  getPost(id: number | string): Promise<ApiResponse<Post>> {
    return api.get(`/posts/${id}`);
  },
  
  /**
   * Create a new post
   * @param postData - Post data
   * @returns API response
   */
  createPost(postData: PostData): Promise<ApiResponse<Post>> {
    return api.post('/posts', postData);
  },
  
  /**
   * Update an existing post
   * @param id - Post ID
   * @param postData - Post data
   * @returns API response
   */
  updatePost(id: number | string, postData: PostData): Promise<ApiResponse<Post>> {
    return api.put(`/posts/${id}`, postData);
  },
  
  /**
   * Delete a post
   * @param id - Post ID
   * @returns API response
   */
  deletePost(id: number | string): Promise<ApiResponse<void>> {
    return api.delete(`/posts/${id}`);
  },
  
};

export default postsService;
