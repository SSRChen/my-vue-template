import router from '.';
import { memberService } from '@/services';

router.beforeEach((to, from, next) => {

  const isLogin = memberService.isLogin();
  const isInit = memberService.isInit();

  if (to.name === 'Login') {
    if (isLogin) {
      next(false);
    } else {
      next();
    }
  } else if (to.meta && to.meta.auth) {
    if (isLogin) {
      if (isInit) {
        next();
      } else {
        memberService.updateUserInfo()
          .then(() => next())
          .catch(() => next(`/login?redirect=${to.path}`));
      }
    } else {
      next(`/login?redirect=${to.path}`);
    }
  } else {
    next();
  }
});