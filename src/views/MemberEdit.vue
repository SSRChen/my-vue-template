<template>
  <div>
    <van-nav-bar title="详情" left-arrow @click-left="$router.back()" />
    <van-form @submit="submit">
      <van-field v-model="form.name" name="姓名" label="姓名" placeholder="姓名" />
      <van-field v-model="form.bank_name" name="银行" label="银行" placeholder="银行" />
      <van-field v-model="form.bank_account" name="银行卡号" label="银行卡号" placeholder="银行卡号" />
      <div class="common-buttonarea">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="loading"
          :loading="loading"
          loading-text="正在保存"
        >保存</van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar, Dialog, Toast, Button, Form, Field } from 'vant';
import { Member, memberService } from '../services';

@Component({
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field
  }
})
export default class MemberEdit extends Vue {

  form = {
    name: '',
    bank_name: '',
    bank_account: ''
  };

  loading = false;

  created() {
    const member = memberService.getUserInfo();
    this.form = {
      name: member.name,
      bank_name: member.bank_name,
      bank_account: member.bank_account
    }
  }

  submit() {
    this.loading = true;
    const data = { ...this.form };
    memberService.update(data)
      .then(() => {
        this.$router.back();
      })
      .catch(error => {
        Toast.fail(error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
