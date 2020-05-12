<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar route fixed placeholder>
      <van-tabbar-item
        v-for="item in items"
        :key="item.to.name"
        :to="item.to"
        :icon="item.icon"
      >{{item.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Tabbar, TabbarItem } from 'vant';
import { RouteConfig } from 'vue-router';

@Component({
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
})
export default class RootLayout extends Vue {

  items: any[] = [];

  mounted() {
    const routes: RouteConfig[] = (this.$router as any).options.routes;
    const rootRoutes = this.findRootRoutes(routes);
    rootRoutes.forEach(route => {
      this.items.push({
        title: route.meta.title,
        to: { name: route.name },
        icon: route.meta.icon
      });
    });
  }

  findRootRoutes(routes: RouteConfig[]): RouteConfig[] {
    const rootRoutes: RouteConfig[] = [];
    routes.forEach(route => {
      if (route.children) {
        rootRoutes.push(...this.findRootRoutes(route.children));
      } else if (route.meta && route.meta.root) {
        rootRoutes.push(route);
      }
    });
    return rootRoutes;
  }
}
</script>
<style lang="scss" scoped>
</style>