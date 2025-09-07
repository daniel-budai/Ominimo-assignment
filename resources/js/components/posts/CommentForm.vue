<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <form @submit.prevent="submitForm">
      <TextArea
        v-model="commentText"
        :rows="3"
        placeholder="Write a comment..."
        :error="error"
        required
      />
      <div class="flex justify-end mt-3">
        <Button
          type="submit"
          variant="primary"
          :loading="loading"
        >
          {{ loading ? 'Posting...' : 'Post Comment' }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/Button.vue';
import TextArea from '../ui/TextArea.vue';

const props = defineProps({
  postId: {
    type: [Number, String],
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit']);

const commentText = ref('');
const error = ref('');

const clearForm = () => {
  commentText.value = '';
  error.value = '';
};

defineExpose({
  clearForm
});

const submitForm = () => {
  if (!commentText.value.trim()) {
    error.value = 'Comment cannot be empty';
    return;
  }
  
  error.value = '';
  emit('submit', {
    comment: commentText.value,
    post_id: props.postId
  });
};
</script>
