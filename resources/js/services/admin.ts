import type { ApiResponse } from '../types/api';
import type { User, Post, Comment } from '../types/models';
import api from './api';

export interface AdminData {
  posts: Post[];
  comments: Comment[];
  users: User[];
}

class AdminService {
  async getAllPosts(): Promise<ApiResponse<Post[]>> {
    return api.get('/admin/posts');
  }

  async getAllComments(): Promise<ApiResponse<Comment[]>> {
    return api.get('/admin/comments');
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return api.get('/admin/users');
  }

  async deletePost(id: number): Promise<ApiResponse<{ message: string }>> {
    return api.delete(`/admin/posts/${id}`);
  }

  async deleteComment(id: number): Promise<ApiResponse<{ message: string }>> {
    return api.delete(`/admin/comments/${id}`);
  }

  async updateUserRole(userId: number, role: 'user' | 'admin'): Promise<ApiResponse<{ message: string; user: User }>> {
    return api.put(`/admin/users/${userId}/role`, { role });
  }

  async getDashboardData(): Promise<AdminData> {
    const [postsResponse, commentsResponse, usersResponse] = await Promise.all([
      this.getAllPosts(),
      this.getAllComments(),
      this.getAllUsers()
    ]);

    return {
      posts: postsResponse.data,
      comments: commentsResponse.data,
      users: usersResponse.data
    };
  }
}

export const adminService = new AdminService();
