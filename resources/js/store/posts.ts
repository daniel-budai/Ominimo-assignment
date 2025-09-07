import { defineStore } from 'pinia';
import { postsService, commentsService } from '../services';
import type { Post, PostData, Comment, CommentData } from '../types/models';
import type { PostsState, Pagination } from '../types/store/posts';

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      perPage: 10
    }
  }),
  
  getters: {
    // Get all posts
    getAllPosts: (state: PostsState): Post[] => state.posts,
    
    // Get current post
    getCurrentPost: (state: PostsState): Post | null => state.currentPost,
    
    // Check if posts are loading
    isLoading: (state: PostsState): boolean => state.loading,
    
    // Get error
    getError: (state: PostsState): string | null => state.error,
    
    // Get pagination info
    getPagination: (state: PostsState): Pagination => state.pagination
  },
  
  actions: {
    // Set loading state
    setLoading(status: boolean): void {
      this.loading = status;
    },
    
    // Set error state
    setError(error: string | null): void {
      this.error = error;
    },
    
    // Clear error state
    clearError(): void {
      this.error = null;
    },
    
    // Set pagination
    setPagination(pagination: Partial<Pagination>): void {
      this.pagination = {
        ...this.pagination,
        ...pagination
      };
    },
    
    // Fetch all posts with optional pagination
    async fetchPosts(params: Record<string, any> = {}): Promise<Post[]> {
      this.setLoading(true);
      this.clearError();
      
      try {
        const response = await postsService.getAllPosts(params);
        const responseData = response.data;
        
        // Check if we have a paginated response with meta data
        if (responseData && responseData.meta) {
          // Handle paginated response
          this.setPagination({
            currentPage: responseData.meta.current_page || 1,
            totalPages: responseData.meta.last_page || 1,
            totalItems: responseData.meta.total || 0,
            perPage: responseData.meta.per_page || 10
          });
          
          // Set posts from paginated data
          if (Array.isArray(responseData.data)) {
            this.posts = responseData.data;
          } else {
            // Fallback if data is not an array
            this.posts = [];
            console.error('Expected posts data to be an array but got:', responseData.data);
          }
        } else {
          // Handle non-paginated response or direct array response
          if (Array.isArray(responseData)) {
            this.posts = responseData;
          } else {
            // Last resort fallback
            this.posts = [];
            console.error('Unexpected API response format:', responseData);
          }
          
          // Reset pagination with defaults
          this.setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: this.posts.length,
            perPage: 10
          });
        }
        
        return this.posts;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Failed to fetch posts');
        this.posts = []; // Reset posts on error
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Fetch a single post by ID
    async fetchPost(id: number | string): Promise<Post> {
      this.setLoading(true);
      this.clearError();
      
      try {
        const response = await postsService.getPost(id);
        this.currentPost = response.data;
        return this.currentPost;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Failed to fetch post');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Create a new post
    async createPost(postData: PostData): Promise<Post> {
      this.setLoading(true);
      this.clearError();
      
      try {
        const response = await postsService.createPost(postData);
        // Optionally update local state
        // this.posts.unshift(response.data);
        return response.data;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Failed to create post');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Update an existing post
    async updatePost(id: number | string, postData: PostData): Promise<Post> {
      this.setLoading(true);
      this.clearError();
      
      try {
        const response = await postsService.updatePost(id, postData);
        
        // Update local state if the post exists in the list
        const index = this.posts.findIndex(post => post.id === id);
        if (index !== -1) {
          this.posts[index] = response.data;
        }
        
        // Update current post if it's the one being edited
        if (this.currentPost && this.currentPost.id === id) {
          this.currentPost = response.data;
        }
        
        return response.data;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Failed to update post');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Delete a post
    async deletePost(id: number | string): Promise<boolean> {
      this.setLoading(true);
      this.clearError();
      
      try {
        await postsService.deletePost(id);
        
        // Remove from local state
        this.posts = this.posts.filter(post => post.id !== id);
        
        // Clear current post if it's the one being deleted
        if (this.currentPost && this.currentPost.id === id) {
          this.currentPost = null;
        }
        
        return true;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Failed to delete post');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Add a comment to a post
    async addComment(postId: number | string, commentData: CommentData): Promise<Comment> {
      this.setLoading(true);
      this.clearError();
      
      try {
        const response = await commentsService.addComment(postId, commentData);
        
        // Update current post with new comment if it's loaded
        if (this.currentPost && this.currentPost.id == postId) {
          if (!this.currentPost.comments) {
            this.currentPost.comments = [];
          }
          this.currentPost.comments.push(response.data);
        }
        
        return response.data;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Failed to add comment');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Delete a comment
    async deleteComment(postId: number | string, commentId: number | string): Promise<boolean> {
      this.setLoading(true);
      this.clearError();
      
      try {
        await commentsService.deleteComment(commentId);
        
        // Update current post by removing the deleted comment if it's loaded
        if (this.currentPost && this.currentPost.id == postId && this.currentPost.comments) {
          this.currentPost.comments = this.currentPost.comments.filter(
            comment => comment.id != commentId
          );
        }
        
        return true;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Failed to delete comment');
        throw error;
      } finally {
        this.setLoading(false);
      }
    }
  }
});
