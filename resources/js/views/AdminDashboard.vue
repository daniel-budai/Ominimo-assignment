<template>
  <div class="admin-dashboard">
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p class="mt-2 text-sm text-gray-700">Manage posts, comments, and users</p>
        </div>
      </div>
    </div>

    <div class="mt-8 px-4 sm:px-6 lg:px-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ posts.length }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Comments</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ comments.length }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ users.length }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mt-8">
        <div class="sm:hidden">
          <select v-model="activeTab" class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
            <option value="posts">Posts</option>
            <option value="comments">Comments</option>
            <option value="users">Users</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav class="flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="mt-6">
        <!-- Posts Tab -->
        <div v-if="activeTab === 'posts'" class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="post in posts" :key="post.id" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-medium text-gray-900 truncate">{{ post.title }}</h3>
                  <p class="text-sm text-gray-500">By {{ post.user?.name }} • {{ formatDate(post.created_at) }}</p>
                  <p class="mt-2 text-sm text-gray-600">{{ truncateText(post.content, 100) }}</p>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <Button
                    @click="deletePost(post.id)"
                    variant="danger"
                    size="sm"
                    :loading="deletingPost === post.id"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Comments Tab -->
        <div v-if="activeTab === 'comments'" class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="comment in comments" :key="comment.id" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-600">{{ comment.comment }}</p>
                  <p class="text-sm text-gray-500 mt-1">
                    By {{ comment.user?.name || 'Guest' }} on "{{ comment.post?.title }}" • {{ formatDate(comment.created_at) }}
                  </p>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <Button
                    @click="deleteComment(comment.id)"
                    variant="danger"
                    size="sm"
                    :loading="deletingComment === comment.id"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Users Tab -->
        <div v-if="activeTab === 'users'" class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="user in users" :key="user.id" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-medium text-gray-900">{{ user.name }}</h3>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2',
                    user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  ]">
                    {{ user.role }}
                  </span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <select
                    :value="user.role"
                    @change="updateUserRole(user.id, ($event.target as HTMLSelectElement).value as 'user' | 'admin')"
                    class="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { adminService } from '../services';
import Button from '../components/ui/Button.vue';
import type { Post, Comment, User } from '../types/models';

const activeTab = ref('posts');
const posts = ref<Post[]>([]);
const comments = ref<Comment[]>([]);
const users = ref<User[]>([]);
const loading = ref(false);
const deletingPost = ref<number | null>(null);
const deletingComment = ref<number | null>(null);

const tabs = [
  { id: 'posts', name: 'Posts' },
  { id: 'comments', name: 'Comments' },
  { id: 'users', name: 'Users' }
];

const loadDashboardData = async () => {
  loading.value = true;
  try {
    const data = await adminService.getDashboardData();
    posts.value = data.posts;
    comments.value = data.comments;
    users.value = data.users;
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
  } finally {
    loading.value = false;
  }
};

const deletePost = async (postId: number) => {
  if (!confirm('Are you sure you want to delete this post?')) return;
  
  deletingPost.value = postId;
  try {
    await adminService.deletePost(postId);
    posts.value = posts.value.filter(p => p.id !== postId);
  } catch (error) {
    console.error('Failed to delete post:', error);
    alert('Failed to delete post');
  } finally {
    deletingPost.value = null;
  }
};

const deleteComment = async (commentId: number) => {
  if (!confirm('Are you sure you want to delete this comment?')) return;
  
  deletingComment.value = commentId;
  try {
    await adminService.deleteComment(commentId);
    comments.value = comments.value.filter(c => c.id !== commentId);
  } catch (error) {
    console.error('Failed to delete comment:', error);
    alert('Failed to delete comment');
  } finally {
    deletingComment.value = null;
  }
};

const updateUserRole = async (userId: number, newRole: 'user' | 'admin') => {
  try {
    await adminService.updateUserRole(userId, newRole);
    const user = users.value.find(u => u.id === userId);
    if (user) {
      user.role = newRole;
    }
  } catch (error) {
    console.error('Failed to update user role:', error);
    alert('Failed to update user role');
  }
};

const formatDate = (date: string | undefined) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

onMounted(() => {
  loadDashboardData();
});
</script>

<style scoped>
.admin-dashboard {
  min-height: calc(100vh - 64px);
  background-color: #f9fafb;
}
</style>
