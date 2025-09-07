<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h1 class="text-2xl font-bold text-gray-900">Welcome to the Blog Application</h1>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        A simple blog application built with Laravel and Vue.js
      </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
      <p class="text-gray-700 mb-4">
        This application allows you to:
      </p>
      <ul class="list-disc pl-5 space-y-2 text-gray-700">
        <li>View blog posts from other users</li>
        <li>Create your own blog posts (requires authentication)</li>
        <li>Comment on posts (as a registered user or guest)</li>
        <li>Edit and delete your own posts and comments</li>
      </ul>
      <div class="mt-6">
        <router-link 
          to="/posts" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Browse Posts
        </router-link>
        <router-link 
          v-if="!isAuthenticated"
          to="/register" 
          class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </router-link>
        <router-link 
          v-if="isAuthenticated"
          to="/posts/create" 
          class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Post
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>
