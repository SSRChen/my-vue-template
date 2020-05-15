<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <van-form @submit="login">
      <van-field
        v-model="form.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div class="common-buttonarea">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="loading"
          :disabled="loading"
          loading-text="正在登录"
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Button, Form, Field, Toast, NavBar } from 'vant';
import { memberService } from '@/services';

@Component({
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [NavBar.name]: NavBar
  },
})
export default class HomePage extends Vue {

  loading = false;

  form = {
    username: '',
    password: ''
  }

  rules = {
    username: [{ required: true, message: '请填写用户名' }],
    password: [{ required: true, message: '请填写密码' }]
  }

  login() {
    this.loading = true;
    const { username, password } = this.form;
    memberService.login(username, password)
      .then(() => {
        this.loginSuccess();
      })
      .catch(error => {
        Toast.fail(error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  loginSuccess() {
    const redirect = <string>this.$route.query.redirect || '/';
    this.$router.replace(redirect);
  }
}
</script>
<style lang="scss" scoped>
</style>