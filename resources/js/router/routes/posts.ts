import type { AppRouteRecordRaw } from '../../types/router';

// Posts routes
const postRoutes: AppRouteRecordRaw[] = [
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../../views/posts/PostList.vue'),
    meta: {
      title: 'All Posts'
    }
  },
  {
    path: '/posts/create',
    name: 'posts.create',
    component: () => import('../../views/posts/PostCreate.vue'),
    meta: { 
      requiresAuth: true,
      title: 'Create Post'
    }
  },
  {
    path: '/posts/:id',
    name: 'posts.show',
    component: () => import('../../views/posts/PostShow.vue'),
    props: true,
    meta: {
      title: 'View Post'
    }
  },
  {
    path: '/posts/:id/edit',
    name: 'posts.edit',
    component: () => import('../../views/posts/PostEdit.vue'),
    props: true,
    meta: { 
      requiresAuth: true,
      title: 'Edit Post'
    }
  }
];

export default postRoutes;
