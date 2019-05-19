<template>
  <div class="goods" ref='goods'>
    <div class="menu"  ref="menu">
      <ul>
        <li v-for="(val,index) in goods" :key="index" class="menuItem" :class="{current:switchMenuIndex() === index}" @click= "toggleNav(scroll.foods, index)" @touchstart= 'initScrollData($event, scroll.menu)' @touchmove = "startScroll($event, scroll.menu)" @touchend= "entScroll(scroll.menu, scroll.foods)">
          <p class="text">
            <span v-show="val.type > 0" class="icon" :class="classMap"></span>
            <span> {{val.name}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="foods" ref="foods">
      <ul>
        <li v-for="(val, index) in goods" :key="index" class="foodsList" @touchstart= 'initScrollData($event, scroll.foods)' @touchmove = "startScroll($event, scroll.foods)" @touchend= "entScroll(scroll.foods, index, scroll.foods)">
          <h1 class="title"> {{val.name}}</h1>
          <ul>
            <li v-for="(food, findex) in val.foods" :key="findex" class="foodItem" @touchstart='acquire(food)'>
              <div class="icon" @touchstart='goodsDetail()'>
                <img :src="food.icon">
              </div>
              <div class="f-conent">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥<span class="p-price">{{food.price}}</span></span>
                  <span v-if="food.oldPrice" class="p-floor">￥{{food.oldPrice}}</span>
                  <PRICE :food='food'></PRICE>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <cart ref="cart" :select-foods='selectFoods' :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></cart>
    <goodsDetail ref="goodWrapper" :food='foodList' ></goodsDetail>
  </div>
</template>
<script>
import cart from '../../common/cart/cart';
import PRICE from '../../common/price/price';
import goodsDetail from './goodsDetails/goodsDetails';
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      initY: 0,
      scrollY: 0,
      listH: [],
      foodList: {}
    };
  },
  created () {
    this.axios
    .get('api/goods')
    .then(res => {
      this.goods = res.data;
    });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  mounted () {
    this.scroll = {
      menu: {
        scrollY: 0,
        recordY: 0,
        listY: [],
        el: this.$refs.menu,
        cls: '.menuItem',
        parent: '.menu',
        index: 0
      },
      foods: {
        scrollY: 0,
        recordY: 0,
        listY: [],
        el: this.$refs.foods,
        cls: '.foodsList',
        parent: '.foods'
      }
    };
  },
  computed: {
    selectFoods () {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    initScrollData (e, re) {
      this.initY = Math.ceil(e.changedTouches[0].clientY) + Math.abs(re.recordY);
    },
    startScroll (e, re) {
      var moveElm = re.el;
      this.scrollY = re.scrollY = re.recordY = Math.ceil(e.changedTouches[0].clientY - this.initY);
      if (re.scrollY < 0) {
        moveElm.style.transition = 'none';
        moveElm.style.top = Math.ceil(re.scrollY) + 'px';
      } else {
        moveElm.style.transition = 'none';
        moveElm.style.top = Math.ceil(re.scrollY) + 'px';
      }
    },
    entScroll (re, index, rel) {
      var moveElm = re.el;
      var goodsH = this.$refs.goods;
      var ul = re.el.querySelector(re.parent + '>ul');
      if (re.scrollY < 0) {
        let carHeight = this.$refs.cart.acquireHeight();
        let YY = goodsH.clientHeight - carHeight - ul.scrollHeight;
        if (Math.abs(re.scrollY) >= Math.abs(YY)) {
          re.recordY = re.scrollY = YY;
          moveElm.style.top = YY + 'px';
          moveElm.style.transition = 'all 0.2s';
        }
      } else {
        if (moveElm.getBoundingClientRect().top > 174) {
          moveElm.style.top = re.recordY = 0;
          moveElm.style.transition = 'all 0.2s';
        }
      }
      if (re.cls === '.foodsList') {
        this.calculateHeight(re);
      }
    },
    calculateHeight (re) {
      let foodList = re.el.querySelectorAll(re.cls);
      let height = 0;
      re.listY = [];
      this.listH = [];
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        re.listY.push(height);
      };
      this.listH = re.listY;
    },
    switchMenuIndex () {
       for (let i = 0; i < this.listH.length; i++) {
         let height = this.listH[i];
         if (Math.abs(this.scrollY) <= height) {
           this.scroll.menu.index = i;
           return this.scroll.menu.index;
         }
       }
      return this.scroll.menu.index;
    },
    toggleNav (rel, index) {
      this.calculateHeight(rel);
      var scrollFoods = rel.el;
      var itemIndex = index - 1;
      if (itemIndex < 0) {
        scrollFoods.style.top = 0 + 'px';
        scrollFoods.style.transition = 'all 0.2s';
        this.scrollY = 0;
        rel.recordY = 0;
      } else {
        this.scroll.menu.index = index;
        this.scrollY = this.listH[index];
        rel.recordY = this.listH[itemIndex];
        scrollFoods.style.top = -this.listH[itemIndex] + 'px';
        scrollFoods.style.transition = 'all 0.2s';
      }
    },
    goodsDetail () {
      this.$refs.goodWrapper.showBlock();
    },
    acquire (food) {
      this.foodList = food;
    }
  },
  components: {
    cart,
    PRICE,
    goodsDetail
  }
};
</script>
<style lang="less" scoped>
  @import '../../common/tools/mixin.less';
  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    overflow: hidden;
    .px2Rem(top, 174 * 2);
    .px2Rem(bottom,0);
    .px2Rem(padding-bottom,96);
    .menu {
      .px2Rem(flex-basis, 160);
      .px2Rem(width, 160);
      position: relative;
      .menuItem {
        display: table;
        text-align: center;
        color: rgb(20, 20, 20);
        word-wrap: break-word;
        .wh(112, 108);
        .px2Rem(font-size, 24);
        .px2Rem(line-height, 28);
        .px2Rem2(padding, 0, 24);
        background-color: #f3f5f7;
        .icon {
          display: @dib;
          .wh(24,24);
          .px2Rem(margin-right,2);
          .px2Rem(background-size,24);
          background-repeat: no-repeat;
          &.decrease {
            .bgImg('../header/images/decrease_2');
          }
          &.discount {
            .bgImg('../header/images/discount_2');
          }
          &.guarantee {
            .bgImg('../header/images/guarantee_2');
          }
          &.invoice {
            .bgImg('../header/images/invoice_2');
          }
          &.special {
            .bgImg('../header/images/special_2');
          }
        }
        &.current {
          position: relative;
          z-index: 10;
          background: #fff;
          font-weight: 700;
        }
        .text {
          display: table-cell;
          .px2Rem(font-size, 24);
          vertical-align: middle;
          .border(1,rgba(1,17,27,0.1));
          .border-none();
        }
      }
    }
    .foods {
      flex: 1;
      position: relative;
      .title {
        .px2Rem(font-size, 24);
        .px2Rem(padding-left, 24);
        .px2Rem(line-height, 52);
        .px2Rem(height, 52);
        .bd(border-left, 4, solid,#d9dde1);
        margin: 0;
        background-color:#f3f5f7;
        color: rgb(147, 153, 159);
        font-weight: 200;
      }
      .foodItem {
        display: flex;
        position: relative;
        .px2Rem(margin, 36);
        .border(2, rgba(7,17,27,0.1));
        .px2Rem(padding-bottom, 36);
        &:last-child {
          .border-none();
        }
        .icon {
          .px2Rem(flex-basis, 114);
          .px2Rem(margin-right, 20);
          img {
            .wh(114, 114);
          }
        }
        .f-conent {
          color: rgb(147,153,159);
          .px2Rem(font-size, 20);
          .name {
            .px2Rem(font-size, 28);
            .px2Rem(line-height,28);
            color: rgb(7,17,27);
            font-weight: 200;
            .px2Rem(margin-top, 4);
            .px2Rem(margin-bottom, 16);
          }
          .desc {
            .px2Rem(margin-bottom, 16);
            }
          .extra{
            .px2Rem(margin-bottom, 8);
          }
           .price {
            color: red;
            .px2Rem(font-size, 20);
            .px2Rem(line-height,48);
            .p-price {
              .px2Rem(font-size, 28);
            }
            .p-floor{
              color: rgb(147,153,159);
              font-weight: 700;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
</style>
