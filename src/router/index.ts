import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import rootLayoutComponent from '@/layout/Root.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: rootLayoutComponent,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: { root: true, title: '首页', icon: 'home-o' }
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import(/* webpackChunkName: "member" */ '../views/Member.vue'),
        meta: { root: true, title: '我的', icon: 'user-circle-o' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
