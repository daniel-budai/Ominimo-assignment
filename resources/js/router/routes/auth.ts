import type { AppRouteRecordRaw } from '../../types/router';

// Auth routes
const authRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../../views/auth/Login.vue'),
    meta: { 
      guest: true,
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../../views/auth/Register.vue'),
    meta: { 
      guest: true,
      title: 'Register'
    }
  }
];

export default authRoutes;
