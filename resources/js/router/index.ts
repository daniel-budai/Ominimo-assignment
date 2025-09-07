import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';
import routes from './routes';
import { setupRouterGuards } from './guards';

// Create router instance
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 };
  }
});

// Setup navigation guards
setupRouterGuards(router);

export default router;
