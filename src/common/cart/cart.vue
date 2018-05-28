<template>
  <div class="cart" ref='cart'>
      <div class="goodsType_wraper" v-show="isActive">
        <div class="goodsType">
          <div class="g_title">
            <span class="g_cart">购物车</span>
            <span class="clear"  @touchstart='clearAll'>清空</span>
          </div>
          <div ref="goodItem" class="goodItem">
            <ul >
              <li class="typeItem" v-for="(val, index) in selectFoods" :key="index" @touchstart= 'initScrollData($event, scroll)' @touchmove = "startScroll($event, scroll)" @touchend= "entScroll(scroll)">
                <span class="goodsName">{{val.name}}</span>
                <span class="goodPrice">￥<span class="p-price">{{val.price * val.count}}</span></span>
                <BUY :food='val'></BUY>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="c-c" @touchstart='ShowBlock'>
        <div class="c-c-c" :class="{c_c_count:selectFoods.length}">
          <span class="iconfont icon-gouwuche"></span>
        </div>
        <div class="count" v-show="totalCount">
         <span> {{totalCount}}</span>
        </div>
      </div>
      <div class="c-left">
        <div class="c-price">
          <span class="c-p-prize">￥{{totalPrice}}</span>
        </div>
        <div class="c-info">
          <span class="c-i-info">另需配送费￥{{deliveryPrice}}元</span>
        </div>
      </div>
      <div class="c-right">
        <span>￥{{minPrice}}起送 </span>
      </div>
  </div>
</template>

<script>
import BUY from '../price/price';
export default {
  data () {
    return {
      isActive: false,
      initY: 0,
      scrollY: 0
    };
  },
  props: {
    selectFoods: {
      type: Array
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  },
  mounted () {
    this.scroll = {
      goodItem: {
        scrollY: 0,
        recordY: 0,
        listY: [],
        el: this.$refs.goodItem,
        cls: '.goodItem'
      }};
  },
  computed: {
    totalPrice () {
      let Price = 0;
      this.selectFoods.forEach(food => {
        Price += food.price * food.count;
      });
      return Price;
    },
    totalCount () {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    }
  },
  watch: {
    selectFoods (val, tt) {
      if (!val.length) {
        this.isActive = false;
      }
    }
  },
  methods: {
    ShowBlock () {
      if (!this.selectFoods.length) {
        this.isActive = false;
        return;
      }
      this.isActive = !this.isActive;
    },
    clearAll () {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    initScrollData (e, re) {
      this.initY = Math.ceil(e.changedTouches[0].clientY) + Math.abs(re.goodItem.recordY);
    },
    startScroll (e, re) {
      var moveElm = re.goodItem.el;
      this.scrollY = re.goodItem.scrollY = re.goodItem.recordY = Math.ceil(e.changedTouches[0].clientY - this.initY);
      if (re.goodItem.scrollY < 0) {
        moveElm.style.transition = 'none';
        moveElm.style.top = Math.ceil(re.goodItem.scrollY) + 'px';
      } else {
        moveElm.style.transition = 'none';
        moveElm.style.top = Math.ceil(re.goodItem.scrollY) + 'px';
      }
    },
    entScroll (re) {
      var moveElm = re.goodItem.el;
      var ul = re.goodItem.el.querySelector(re.goodItem.cls + '>ul');
      if (re.goodItem.scrollY < 0) {
        let YY = moveElm.clientHeight - ul.scrollHeight;
        if (Math.abs(re.goodItem.scrollY) >= Math.abs(YY)) {
          re.goodItem.recordY = re.goodItem.scrollY = YY;
          moveElm.style.top = YY + 'px';
          moveElm.style.transition = 'all 0.2s';
        }
      } else {
        if (moveElm.getBoundingClientRect().top > 174) {
          moveElm.style.top = re.goodItem.recordY = 0;
          moveElm.style.transition = 'all 0.2s';
        }
      }
    },
    acquireHeight () {
      var height = this.$refs.cart;
      return height.clientHeight;
    }
  },
  components: {
    BUY
  }
};
</script>

<style lang="less">
  @import '../../common/tools/mixin.less';
  .cart {
    position: fixed;
    left: 0;
    bottom:0;
    z-index: 999;
    .px2Rem(height, 96);
    width: 100%;
    display: flex;
    background-color: #141d27;
    .goodsType_wraper {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height:100%;
      z-index: -1;
      background-color: rgba(7,17,27,0.6);
      .goodsType {
        width: 100%;
        position: absolute;
        left: 0;
        overflow: hidden;
        background-color: #f3f5f7;
        .px2Rem(bottom,96);
        .px2Rem(height,515);
        .g_title {
          display:flex;
          .px2Rem(line-height, 80);
          .px2Rem2(padding, 0, 36);
          .border(4, rgba(7,17,27,0.1));
          .g_cart {
            flex: 1;
            color: rgb(7,17,27);
            .px2Rem(font-size, 28);
          }
          .clear {
            flex: 1;
            text-align: right;
            color: rgb(0,160,220);
            .px2Rem(font-size, 24);
          }
        }
        .goodItem {
          position: relative;
          .typeItem {
            position: relative;
            background-color: #fff;
            display: flex;
            .px2Rem2(padding, 24, 36);
            .px2Rem(line-height, 48);
            .border(2,rgba(7,17,27,0.1));
            .goodsName {
              flex: 1;
              color: rgb(7,17,27);
              .px2Rem(font-size, 28);
            }
            .goodPrice {
              color: red;
              .px2Rem(font-size, 20);
              .p-price {
                .px2Rem(font-size, 28);
                .px2Rem(padding-right,168);
              }
            }
            .buy {
              .px2Rem(right, 36);
              .px2Rem(bottom, 30);
            }
          }
        }
      }
    }
    .c-c {
      position: absolute;
      .px2Rem(left, 36);
      .px2Rem(bottom, 16);
      .wh(116, 116);
      text-align: center;
      .px2Rem(line-height, 124);
      background-color: #141d27;
      border-radius: 50%;
      .c-c-c {
        display: @dib;
        .wh(88,88);
        .px2Rem(line-height, 88);
        border-radius: 50%;
        color: rgba(255,255,255,0.4);
        background-color: rgba(255,255,255,0.4);
        // background-color: red;
      }
      .c_c_count {
        .c-c-c;
        color: rgb(255,255,255);
        background-color: rgb(0,160,220);
      }
      .count {
        position: absolute;
        top: 0;
        font-weight: 700;
        color: rgb(255,255,255);
        background-color:rgb(240,20,20);
        .px2Rem(left,88);
        .wh(48,32);
        .px2Rem2(border-radius,12,12);
        .px2Rem(font-size,18);
        .px2Rem(line-height,32);
        .box(box-shadow,0,4,8,0,rgba(0,0,0,0.4));
      }
    }
    .c-left {
      flex: 1;
      display: flex;
      .c-price {
        flex: 1;
        .px2Rem(line-height, 48);
        .px2Rem4(padding, 0, 24, 0, 160);
        .px2Rem2(margin, 24, 0);
        .bd(border-right, 2, solid, rgba(255,255,255,0.1));
        .c-p-prize {
          display: @dib;
          color: rgb(255,255,255);
          font-weight: 700;
          .px2Rem(font-size, 32);
        }
      }
      .c-info {
        .px2Rem(line-height, 96);
        .px2Rem(padding-left,24);
        .px2Rem(padding-right, 68);
        .c-i-info {
          display: @dib;
          color: rgba(255,255,255,0.4);
          .px2Rem(font-size, 16);
        }
      }
    }
    .c-right {
      .wh(150,96);
      .px2Rem(font-size, 24);
      text-align: center;
      float: right;
      .px2Rem(line-height, 96);
      font-weight: 700;
      color: rgba(255,255,255,0.4);
      background-color: rgba(255,255,255,0.4);
    }
  }
</style>
