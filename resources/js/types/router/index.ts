import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    requiresAdmin?: boolean;
    guest?: boolean;
    [key: string]: any;
  };
  children?: AppRouteRecordRaw[];
}

export type AppRouteLocationNormalized = RouteLocationNormalized;
export type AppNavigationGuardNext = NavigationGuardNext;