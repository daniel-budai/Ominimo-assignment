import type { Router } from 'vue-router';
import { useAuthStore } from '../store';
import type { AppRouteLocationNormalized, AppNavigationGuardNext } from '../types/router';

/**
 * Setup router guards
 * @param router - Vue Router instance
 */
export function setupRouterGuards(router: Router): void {
  // Global before guard
  router.beforeEach(async (
    to: AppRouteLocationNormalized, 
    _from: AppRouteLocationNormalized, 
    next: AppNavigationGuardNext
  ) => {
    const authStore = useAuthStore();
    
    // Set document title
    document.title = to.meta.title ? `${to.meta.title} | Blog App` : 'Blog App';
    
    // Initialize auth state if needed
    if (!authStore.isAuthenticated && !authStore.loading) {
      await authStore.init();
    }
    
    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } });
    } 
    // Check if route requires admin access
    else if (to.meta.requiresAdmin && !authStore.isAdmin) {
      next({ name: 'home' });
    }
    // Check if route is for guests only (like login page)
    else if (to.meta.guest && authStore.isAuthenticated) {
      next({ name: 'home' });
    } 
    else {
      next();
    }
  });
  
  // Global after hook
  router.afterEach(() => {
    // Scroll to top after route change
    window.scrollTo(0, 0);
  });
}
