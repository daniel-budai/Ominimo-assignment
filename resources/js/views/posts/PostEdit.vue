<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Edit Post</h1>

    <div v-if="loading" class="flex justify-center my-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <form v-else @submit.prevent="submitForm" class="bg-white rounded-lg shadow-md p-6">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p v-if="validationErrors.title" class="text-red-500 text-sm mt-1">{{ validationErrors.title[0] }}</p>
      </div>

      <div class="mb-6">
        <label for="content" class="block text-gray-700 font-medium mb-2">Content</label>
        <textarea
          id="content"
          v-model="form.content"
          rows="6"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <p v-if="validationErrors.content" class="text-red-500 text-sm mt-1">{{ validationErrors.content[0] }}</p>
      </div>

      <div class="flex justify-between">
        <button
          type="button"
          @click="$router.go(-1)"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          :disabled="submitting"
        >
          <span v-if="submitting">Saving...</span>
          <span v-else>Update Post</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const router = useRouter();
const loading = ref(true);
const submitting = ref(false);
const error = ref<string | null>(null);
const validationErrors = ref<Record<string, string[]>>({});

const form = reactive({
  title: '',
  content: ''
});

onMounted(async () => {
  try {
    const response = await api.get(`/posts/${props.id}`);
    const post = response.data;
    
    const userResponse = await api.get('/user');
    if (userResponse.data.id !== post.user_id) {
      router.push({ name: 'posts.show', params: { id: props.id } });
      return;
    }
    
    form.title = post.title;
    form.content = post.content;
  } catch (err: any) {
    console.error('Error fetching post:', err);
    error.value = 'Failed to load post. Please try again later.';
  } finally {
    loading.value = false;
  }
});

const submitForm = async () => {
  submitting.value = true;
  error.value = null;
  validationErrors.value = {};
  
  try {
    await api.put(`/posts/${props.id}`, form);
    router.push({ name: 'posts.show', params: { id: props.id } });
  } catch (err: any) {
    console.error('Error updating post:', err);
    
    if (err.response && err.response.status === 422) {
      validationErrors.value = err.response.data.errors || {};
    } else if (err.response && err.response.status === 403) {
      error.value = 'You are not authorized to edit this post.';
    } else {
      error.value = 'Failed to update post. Please try again.';
    }
  } finally {
    submitting.value = false;
  }
};
</script>