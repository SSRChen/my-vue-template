<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="keepAlive" />
    </keep-alive>
    <router-view v-if="!keepAlive" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {

  get keepAlive() {
    console.log(this.$route)
    return this.$route.meta && this.$route.meta.keepAlive;
  }

}
</script>