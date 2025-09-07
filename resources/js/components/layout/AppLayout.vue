<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../../store/auth';
import Navbar from './Navbar.vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.init();
});
</script>
