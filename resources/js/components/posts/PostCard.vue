<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
    <div class="p-6">
      <h2 class="text-xl font-bold mb-2 truncate">
        <router-link :to="`/posts/${post.id}`" class="text-gray-900 hover:text-blue-600">
          {{ post.title }}
        </router-link>
      </h2>
      
      <div class="text-sm text-gray-500 mb-4 flex items-center">
        <span>{{ post.user?.name || 'Unknown' }}</span>
        <span class="mx-2">•</span>
        <span>{{ formatDate(post.created_at || '') }}</span>
      </div>
      
      <p class="text-gray-700 mb-4 line-clamp-3">
        {{ post.content }}
      </p>
      
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">
            {{ post.comments_count || 0 }} comments
          </span>
        </div>
        
        <div class="flex space-x-2">
          <Button 
            v-if="showViewButton"
            variant="primary" 
            size="sm" 
            @click="navigateToPost"
          >
            View
          </Button>
          
          <Button 
            v-if="canEdit" 
            variant="secondary" 
            size="sm" 
            @click="navigateToEdit"
          >
            Edit
          </Button>
          
          <Button 
            v-if="canDelete" 
            variant="danger" 
            size="sm" 
            @click="$emit('delete', post.id)"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import Button from '../ui/Button.vue';
import type { Post } from '../../types/models';

interface Props {
  post: Post;
  showViewButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showViewButton: true
});

interface Emits {
  'delete': [postId: number];
}

defineEmits<Emits>();

const router = useRouter();
const authStore = useAuthStore();

// Check if current user can edit this post
const canEdit = computed(() => {
  return authStore.isAuthenticated && 
         authStore.user && 
         (props.post.user_id === authStore.user.id || authStore.isAdmin);
});

// Check if current user can delete this post
const canDelete = computed(() => {
  return authStore.isAuthenticated && 
         authStore.user && 
         (props.post.user_id === authStore.user.id || authStore.isAdmin);
});

// Format date
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

// Navigation methods
const navigateToPost = () => {
  router.push(`/posts/${props.post.id}`);
};

const navigateToEdit = () => {
  router.push(`/posts/${props.post.id}/edit`);
};
</script>
