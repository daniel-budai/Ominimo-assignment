<template>
  <AppLayout>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';
import AppLayout from './components/layout/AppLayout.vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.init();
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>