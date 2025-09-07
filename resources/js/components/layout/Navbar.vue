<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold text-gray-800">Blog App</router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link 
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.to"
              :class="[
                'border-transparent text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                { 'hidden': (item.requiresAuth && !isAuthenticated) || (item.requiresAdmin && !isAdmin) }
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div v-if="isAuthenticated" class="flex items-center space-x-4">
            <span class="text-sm font-medium text-gray-700">{{ user?.name }}</span>
            <button @click="logout" class="text-sm font-medium text-red-600 hover:text-red-500">
              Logout
            </button>
          </div>
          <div v-else class="flex items-center space-x-4">
            <router-link to="/login" class="text-sm font-medium text-gray-700 hover:text-gray-500">
              Login
            </router-link>
            <router-link to="/register" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Register
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);
const user = computed(() => authStore.user);

const navigationItems = computed(() => [

  { name: 'Posts', to: '/posts' },
  { name: 'Create Post', to: '/posts/create', requiresAuth: true },
  { name: 'Admin Dashboard', to: '/admin', requiresAuth: true, requiresAdmin: true }
]);

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>
