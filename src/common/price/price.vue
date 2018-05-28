<template>
    <div class="buy">
      <i  v-if= 'this.food.count' class="minus iconfont icon-msnui-sub" @touchstart ='decreaseCart'></i>
      <span  v-if= 'this.food.count' class="count">{{this.food.count}}</span>
      <i class="sum iconfont icon-jiahao" @touchstart='addCart()'></i>
    </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    data () {
      return {
        foodNum: 0
      };
    },
    props: {
      food: {
        type: Object,
        default () {
           return {oldPrice: ''};
        }
      }
    },
    computed: {
    },
    methods: {
      addCart () {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart () {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../../common/tools/mixin.less';
  .buy {
    position:absolute;
    .px2Rem(right, 0);
    .px2Rem(bottom, 36);
    .px2Rem(height, 48);
    .px2Rem(line-height, 48);
    .count {
      display: @dib;
      text-align: center;
      .wh(30, 48);
      .px2Rem(font-size, 20);
      .px2Rem(line-height, 48);
      color: rgb(147, 153, 159);
    }
    .iconfont {
      vertical-align: middle;
      .px2Rem(font-size, 48);
      color: rgb(0,160,220);
    }
  }
</style>
