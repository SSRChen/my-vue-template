<template>
  <div>
    <van-nav-bar title="详情" left-arrow @click-left="$router.back()" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
        <van-cell v-for="item of list" :key="item.username">{{item.username}}</van-cell>
    </van-list>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar, List, Cell } from 'vant';
import { Member, memberService } from '../services';

@Component({
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell
  }
})
export default class MemberTeam extends Vue {

  list: Member[] = [];

  finished: boolean = false;

  loading: boolean = false;

  error: boolean = false;

  page: number = 1;

  reset() {
    this.list = [];
    this.finished = false;
    this.loading = false;
    this.page = 1;
  }

  onLoad() {
    memberService.team(this.page)
      .then(ret => {
        this.list.push(...ret.results);
        this.finished = !ret.next;
        if (!this.finished) this.page++;
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      })
  }

}
</script>
<style lang="scss" scoped>
</style>