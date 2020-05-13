<template>
  <div>
    <van-nav-bar
      title="详情"
      left-arrow
      @click-left="$router.back()"
      right-text="编辑"
      @click-right="toEdit"
    />
    <van-cell-group title="基础信息">
      <van-cell title="姓名" :value="member.name" />
      <van-cell title="等级" :value="member.category_detail" />
    </van-cell-group>
    <van-cell-group title="银行卡信息">
      <van-cell title="银行" :value="member.bank_name" />
      <van-cell title="卡号" :value="member.bank_account" />
    </van-cell-group>
    <div class="common-buttonarea">
      <van-button round block type="danger" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CellGroup, Cell, NavBar, Dialog, Toast, Button } from 'vant';
import { Member, memberService } from '../services';

@Component({
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Button.name]: Button
  }
})
export default class MemberDetail extends Vue {

  member!: Member;

  created() {
    this.member = memberService.getUserInfo();
  }

  logout() {
    Dialog.confirm({
      message: '确认退出当前账号？',
    })
      .then(() => memberService.logout())
      .then(() => {
        Toast.success('退出成功！');
        this.$router.replace('/');
      });
  }

  toEdit() {
    this.$router.push({name: 'MemberEdit'})
  }
}
</script>
<style lang="scss">
</style>