import Vue from 'vue';
import Router from 'vue-router';

/* 使每一个组件的js文件进行分开打包，然后在访问页面的时候按需加载，而不是打包到一个文件夹内，导致js文件过大，导致加载缓慢 */
/* const home = function(r){
    require.ensure([],function(){
        var r = require('../page/home/home');
    },chunkName（模块文件名字）)
} */
const home = r => require.ensure([], () => r(require('@/components/home/home')), 'home');
const goods = r => require.ensure([], () => r(require('@/components/goods/goods')), 'goods');
const seller = r => require.ensure([], () => r(require('@/components/seller/seller')), 'seller');
const ratings = r => require.ensure([], () => r(require('@/components/ratings/ratings')), 'ratings');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: ' ',
      redirect: home
    },
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/',
          component: goods
        },
        {
          path: '/goods',
          name: 'goods',
          component: goods
        }, {
          path: '/seller',
          name: 'seller',
          component: seller
        }, {
          path: '/ratings',
          name: 'ratings',
          component: ratings
        }
      ]
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  // mode: 'history',
  base: '/dist/'
});
