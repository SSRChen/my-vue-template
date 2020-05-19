import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import rootLayoutComponent from '@/layout/Root.vue';

Vue.use(VueRouter);

/**
 * meta
 * root: boolean  是否为根页面
 * title: string  当root为true时有效，展示在底部toolbar上的名字
 * icon: string  当root为true时有效，展示在底部toolbar上的图标
 * auth: boolean  是否启用权限（登录）守卫
 * keepAlive: boolean  是否启用路由缓存
 */

 /**
  * 注意：
  * 2个placeholder用于脚本插入配置，勿删
  */

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
        meta: { root: true, title: '我的', icon: 'user-circle-o', keepAlive: true }
      }
      /* placeholder:root */
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
  }
  /* placeholder:common */
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
