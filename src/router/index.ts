import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import rootLayoutComponent from '@/layout/Root.vue';

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: rootLayoutComponent,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: { root: true, title: '首页', icon: 'home-o', keepAlive: true }
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import(/* webpackChunkName: "member" */ '../views/Member.vue'),
        meta: { root: true, title: '我的', icon: 'user-circle-o',  keepAlive: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/member/detail',
    name: 'MemberDetail',
    component: () => import(/* webpackChunkName: "memberDetail" */ '../views/MemberDetail.vue'),
    meta: { auth: true }
  },
  {
    path: '/member/edit',
    name: 'MemberEdit',
    component: () => import(/* webpackChunkName: "memberEdit" */ '../views/MemberEdit.vue'),
    meta: { auth: true }
  },
  {
    path: '/member/team',
    name: 'MemberTeam',
    component: () => import(/* webpackChunkName: "memberTeam" */ '../views/MemberTeam.vue'),
    meta: { auth: true }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
