<template>
  <div class="home">
    <div class="headerTo">
      <headTop :seller="seller"></headTop>
    </div>
    <div class="tab">
      <router-link tag="li" to= "/goods" class="tab-item">商品</router-link>
      <router-link tag="li" to= "/ratings" class="tab-item">评论</router-link>
      <router-link tag="li" to= "/seller" class="tab-item">商家</router-link>
    </div>
    <div class="content">
      <transition  enter-active-class="animated zoomInDown" leave-active-class="animated bounceOutRight" >
        <keep-alive>
          <router-view :seller="seller" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
  import headTop from '../../common/header/headTop';
  export default {
    name: 'home',
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.axios
        .get('seller')
        .then(res => {
         this.seller = res.data.data;
         console.log(this.seller);
        });
    },
    components: {
      headTop
    }
  };
</script>

<style lang='less' scoped>
  @import '../../common/tools/mixin.less';
  .home {
    .px2Rem(font-size,24);
    .tab {
      display: flex;
      width: 100%;
      .px2Rem(height,80);
      .px2Rem(line-height,80);
      .border(1, rgba(7,17,27,0.1),after, border-top,);
      .border(1, rgba(7,17,27,0.1));
      .tab-item {
        flex: 1;
        display: block;
        text-align: center;
        color: rgb(77,85,93);
        .px2Rem(font-size,28);
        &.active {
          color: #f01414;
        }
      }
    }
  }
</style>
