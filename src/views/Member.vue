<template>
  <div class="member">
    <van-row class="topbar" type="flex" align="center">
      <img class="headimg" src="@/assets/headimg.png" alt="头像" />
      <div class="info">
        <p class="info-username">张三</p>
        <p class="info-level">超级会员</p>
      </div>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Row, Col } from 'vant';

@Component({
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  }
})
export default class MemberPage extends Vue {
}
</script>
<style lang="scss" scoped>
.member {
  .topbar{
    background: #1989fa;
    height: 160px;
    padding: 0 40px;

    .headimg{
      width: 80px;
      height: 80px;
      border: 2px solid #fff;
      border-radius: 50%;
    }
  }
}
</style>