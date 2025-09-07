<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Create New Post</h1>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <form @submit.prevent="submitForm" class="bg-white rounded-lg shadow-md p-6">
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
          <span v-else>Create Post</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';

const router = useRouter();
const submitting = ref(false);
const error = ref<string | null>(null);
const validationErrors = ref<Record<string, string[]>>({});

const form = reactive({
  title: '',
  content: ''
});

const submitForm = async () => {
  submitting.value = true;
  error.value = null;
  validationErrors.value = {};
  
  try {
    const response = await api.post('/posts', form);
    router.push({ name: 'posts.show', params: { id: response.data.id } });
  } catch (err: any) {
    console.error('Error creating post:', err);
    
    if (err.response && err.response.status === 422) {
      validationErrors.value = err.response.data.errors || {};
    } else {
      error.value = 'Failed to create post. Please try again.';
    }
  } finally {
    submitting.value = false;
  }
};
</script>