import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';

import './router/permission';  // 登录权限路由守卫
import './main.scss';

Vue.config.productionTip = false;

Vue.prototype.$store = store;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
