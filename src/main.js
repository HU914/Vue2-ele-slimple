// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import FastClick from 'fastclick';
import router from './router/router';
import './common/tools/rem';
import axios from 'axios';
import './mockJs/mock';

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
axios.defaults.baseURL = process.env.API_HOST;

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
      FastClick.attach(document.body);
  }, false);
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
