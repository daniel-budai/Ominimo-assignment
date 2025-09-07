<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Comments ({{ comments.length }})</h3>
    
    <div v-if="comments.length > 0" class="space-y-4">
      <div 
        v-for="comment in comments" 
        :key="comment.id" 
        class="bg-white rounded-lg shadow-sm p-4"
      >
        <div class="flex justify-between mb-2">
          <span class="font-medium">{{ comment.user?.name || 'Unknown' }}</span>
          <span class="text-sm text-gray-500">{{ formatDate(comment.created_at || '') }}</span>
        </div>
        <p class="text-gray-700">{{ comment.comment }}</p>
        
        <div v-if="canDelete(comment)" class="mt-2 flex justify-end">
          <button 
            @click="$emit('delete', comment.id)" 
            class="text-xs text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-4 text-gray-500">
      No comments yet
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../store/auth';
import type { Comment } from '../../types/models';

interface Props {
  comments?: Comment[];
}

withDefaults(defineProps<Props>(), {
  comments: () => []
});

interface Emits {
  'delete': [commentId: number];
}

defineEmits<Emits>();
const authStore = useAuthStore();

// Format date
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Check if user can delete a comment
const canDelete = (comment: Comment): boolean => {
  if (!authStore.isAuthenticated || !authStore.user) return false;
  
  // User can delete their own comments
  if (comment.user_id === authStore.user.id) return true;
  
  // Admin users can delete any comment
  return authStore.isAdmin;
};
</script>
