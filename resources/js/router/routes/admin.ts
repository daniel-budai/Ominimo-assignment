import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../../views/AdminDashboard.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: 'Admin Dashboard'
    }
  }
];
