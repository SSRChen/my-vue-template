<template>
  <div>
    <van-row class="topbar" type="flex" align="center" @click="toDetail">
      <img class="headimg" src="@/assets/headimg.png" alt="头像" />
      <div v-if="!isLogin" class="info">
        <p class="info-username">点击登录 ></p>
      </div>
      <div v-else-if="member" class="info">
        <p class="info-username">{{member.username}}</p>
        <p class="info-level">{{member.category_detail}}</p>
      </div>
    </van-row>
    <van-grid :column-num="3">
      <van-grid-item icon="friends-o" to="/member/team" text="团队" />
      <van-grid-item icon="qr-invalid" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    <van-cell-group class="cells">
      <van-cell title="单元格" icon="todo-list" is-link />
      <van-cell title="单元格" icon="todo-list" is-link />
      <van-cell title="单元格" icon="todo-list" is-link />
      <van-cell title="单元格" icon="todo-list" is-link />
      <van-cell title="单元格" icon="todo-list" is-link />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Icon, Grid, GridItem, CellGroup, Cell } from 'vant';
import { Member, memberService } from '../services';

@Component({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  }
})
export default class MemberPage extends Vue {

  member: Member | null = null;
  isLogin: boolean = false;

  activated() {
    this.isLogin = memberService.isLogin();
    if (this.isLogin) {
      this.member = memberService.getUserInfo();
      memberService.updateUserInfo().then(member => this.member = member);
    }
  }

  toDetail() {
    if (this.isLogin) {
      this.$router.push({ name: 'MemberDetail' });
    } else {
      this.$router.push({ name: 'Login', query: { redirect: '/member' } });
    }
  }

}
</script>
<style lang="scss" scoped>
.topbar {
  background: #1989fa;
  height: 140px;
  padding: 0 40px;

  .headimg {
    width: 60px;
    height: 60px;
    border: 2px solid #fff;
    border-radius: 50%;
  }

  .info {
    margin-left: 12px;
    color: #fff;

    .info-username {
      font-size: 14px;
    }
    .info-level {
      font-size: 12px;
    }
  }
}

.cells {
  margin-top: 20px;
}
</style>