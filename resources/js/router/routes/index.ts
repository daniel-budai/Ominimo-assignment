import authRoutes from './auth';
import postRoutes from './posts';
import { adminRoutes } from './admin';
import type { AppRouteRecordRaw } from '../../types/router';

// Base routes
const baseRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../../views/Home.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../../views/NotFound.vue'),
    meta: {
      title: 'Page Not Found'
    }
  }
];

// Combine all routes
const routes: AppRouteRecordRaw[] = [
  ...baseRoutes,
  ...authRoutes,
  ...postRoutes,
  ...adminRoutes
];

export default routes;
