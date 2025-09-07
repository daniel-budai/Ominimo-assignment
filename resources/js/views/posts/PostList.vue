<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Posts</h1>
      <Button 
        v-if="authStore.isAuthenticated"
        @click="router.push('/posts/create')"
        variant="primary"
      >
        Create New Post
      </Button>
    </div>

    <!-- Loading State -->
    <div v-if="postsStore.loading" class="flex justify-center my-8">
      <Spinner size="lg" color="blue" />
    </div>

    <!-- Error State -->
    <div v-else-if="postsStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ postsStore.error }}
      <Button @click="fetchPosts" variant="primary" size="sm" class="ml-4">
        Retry
      </Button>
    </div>

    <!-- Empty State -->
    <div v-else-if="posts.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
      <h2 class="text-xl font-semibold mb-2">No posts found</h2>
      <p class="text-gray-600 mb-4">Be the first to create a post!</p>
      <Button 
        v-if="authStore.isAuthenticated"
        @click="router.push('/posts/create')"
        variant="primary"
      >
        Create New Post
      </Button>
      <Button 
        v-else
        @click="router.push('/login')"
        variant="primary"
      >
        Login to Create Post
      </Button>
    </div>

    <!-- Posts List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PostCard 
        v-for="post in posts" 
        :key="post.id" 
        :post="post"
        @delete="confirmDelete(post)"
      />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <div class="flex space-x-2">
        <Button 
          variant="secondary" 
          size="sm"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Previous
        </Button>
        
        <Button 
          v-for="page in paginationPages" 
          :key="page"
          :variant="page === currentPage ? 'primary' : 'secondary'"
          size="sm"
          @click="changePage(page)"
        >
          {{ page }}
        </Button>
        
        <Button 
          variant="secondary" 
          size="sm"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
        </Button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Modal
      v-model="showDeleteModal"
      title="Delete Post"
      confirm-text="Delete"
      confirm-variant="danger"
      :loading="deleting"
      @confirm="deletePost"
    >
      <p>Are you sure you want to delete "{{ postToDelete?.title }}"? This action cannot be undone.</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import { usePostsStore } from '../../store/posts';
import Button from '../../components/ui/Button.vue';
import Spinner from '../../components/ui/Spinner.vue';
import Modal from '../../components/ui/Modal.vue';
import PostCard from '../../components/posts/PostCard.vue';
import type { Post } from '../../types/models';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const postsStore = usePostsStore();

const showDeleteModal = ref(false);
const postToDelete = ref<Post | null>(null);
const deleting = ref(false);

const posts = computed(() => postsStore.getAllPosts);
const currentPage = computed(() => postsStore.getPagination.currentPage);
const totalPages = computed(() => postsStore.getPagination.totalPages);

const paginationPages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    let start = Math.max(1, currentPage.value - 2);
    let end = Math.min(totalPages.value, start + maxVisiblePages - 1);
    
    if (end === totalPages.value) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

const fetchPosts = async () => {
  const page = Number(route.query.page) || 1;
  await postsStore.fetchPosts({ page });
};

const changePage = (page: number) => {
  router.push({ 
    path: route.path,
    query: { ...route.query, page }
  });
};

const confirmDelete = (post: Post) => {
  postToDelete.value = post;
  showDeleteModal.value = true;
};

const deletePost = async () => {
  if (!postToDelete.value) return;
  
  deleting.value = true;
  try {
    await postsStore.deletePost(postToDelete.value.id);
    showDeleteModal.value = false;
  } catch (error) {
    console.error('Error deleting post:', error);
  } finally {
    deleting.value = false;
    postToDelete.value = null;
  }
};

onMounted(() => {
  fetchPosts();
});

watch(
  () => route.query.page,
  () => fetchPosts()
);
</script>