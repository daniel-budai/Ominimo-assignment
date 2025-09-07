<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center my-8">
      <Spinner size="lg" color="blue" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
      <Button @click="fetchPost" variant="primary" size="sm" class="ml-4">
        Retry
      </Button>
    </div>

    <div v-else>
      <!-- Post Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">{{ post?.title }}</h1>
        <div class="flex space-x-2" v-if="canEdit">
          <Button 
            variant="secondary"
            @click="router.push(`/posts/${post?.id}/edit`)"
          >
            Edit
          </Button>
          <Button 
            variant="danger"
            @click="confirmDelete"
          >
            Delete
          </Button>
        </div>
      </div>

      <!-- Post Meta -->
      <div class="text-gray-600 mb-6">
        <p>By {{ post?.user?.name || 'Unknown' }} • {{ formatDate(post?.created_at || '') }}</p>
      </div>

      <!-- Post Content -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="prose max-w-none">
          {{ post?.content }}
        </div>
      </div>

      <!-- Comments Section -->
      <div class="mt-8">
        <h2 class="text-2xl font-bold mb-4">Comments</h2>
        
        <!-- Comment Form -->
        <div v-if="authStore.isAuthenticated" class="mb-6">
          <CommentForm 
            ref="commentFormRef"
            :post-id="post?.id || ''"
            :loading="submittingComment"
            @submit="submitComment"
          />
        </div>
        
        <div v-else class="bg-gray-100 p-4 rounded-md mb-6">
          <p class="text-center">
            <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
            or
            <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
            to post a comment
          </p>
        </div>

        <!-- Comments List -->
        <CommentList 
          :comments="comments"
          @delete="deleteComment"
        />
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
        <p>Are you sure you want to delete this post? This action cannot be undone.</p>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import { usePostsStore } from '../../store/posts';
import Button from '../../components/ui/Button.vue';
import Spinner from '../../components/ui/Spinner.vue';
import Modal from '../../components/ui/Modal.vue';
import CommentForm from '../../components/posts/CommentForm.vue';
import CommentList from '../../components/posts/CommentList.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const router = useRouter();
const authStore = useAuthStore();
const postsStore = usePostsStore();

const loading = ref(true);
const error = ref<string | null>(null);
const showDeleteModal = ref(false);
const deleting = ref(false);
const submittingComment = ref(false);
const commentFormRef = ref();

const post = computed(() => postsStore.getCurrentPost);
const comments = computed(() => post.value?.comments || []);
const canEdit = computed(() => {
  return authStore.isAuthenticated && 
         authStore.user && 
         post.value?.user_id === authStore.user.id;
});

const fetchPost = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    await postsStore.fetchPost(props.id);
  } catch (err: any) {
    console.error('Error fetching post:', err);
    error.value = 'Failed to load post. Please try again later.';
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const confirmDelete = () => {
  showDeleteModal.value = true;
};

const deletePost = async () => {
  deleting.value = true;
  
  try {
    await postsStore.deletePost(props.id);
    router.push({ name: 'posts' });
  } catch (err: any) {
    console.error('Error deleting post:', err);
    error.value = 'Failed to delete post. Please try again.';
    showDeleteModal.value = false;
  } finally {
    deleting.value = false;
  }
};

const submitComment = async (commentData: any) => {
  submittingComment.value = true;
  
  try {
    await postsStore.addComment(props.id, commentData);
    if (commentFormRef.value) {
      commentFormRef.value.clearForm();
    }
  } catch (err: any) {
    console.error('Error posting comment:', err);
    error.value = 'Failed to post comment. Please try again.';
  } finally {
    submittingComment.value = false;
  }
};

const deleteComment = async (commentId: number) => {
  try {
    await postsStore.deleteComment(props.id, commentId);
  } catch (err: any) {
    console.error('Error deleting comment:', err);
    error.value = 'Failed to delete comment. Please try again.';
  }
};

onMounted(() => {
  fetchPost();
});
</script>