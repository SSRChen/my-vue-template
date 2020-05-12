import axios from 'axios';
import store from '@/store';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: process.env.REQUEST_TIMEOUT || 0 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (!config.url?.endsWith('/')) {
      config.url += '/';
    }
    if (store.auth.state.token) {
      config.headers['Authorization'] = `token ${store.auth.state.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response.data;
  },
  error => {
    let message;
    const response = error.response;
    if (response) {
      if (response.status === 401) {
        message = '登录已过期，请重新登陆';
      } else {
        message = response.data ? response.data.detail : '网络错误，请稍后再试';
      }
    } else {
      message = '网络错误，请稍后再试';
    }
    return Promise.reject(new Error(message));
  }
);

export default service;
