<template>
  <div class="seller">
    <div class="sellerContent" ref="sellerContent"  @touchstart= 'initScrollData($event, scroll)' @touchmove = "startScroll($event, scroll)" @touchend= "entScroll(scroll)">
      <div class="market">
        <div class="garde">
          <article class="gardeInfo">
            <h1 class="sellerName">{{seller.name}}</h1>
            <div class="gardeContent">
              <STAR :size='36' :score="seller.serviceScore"></STAR>
              <span class="ratingCount">({{seller.ratingCount}})</span>
              <span class="shopCount"> 月售{{seller.sellCount}}单</span>
            </div>
          </article>
          <div class="collect">
            <span class="iconfont icon-xin" :class="{collect:isCollect}" @touchstart='collect'></span>
            <span class="collectText" v-show="isCollect">已收藏</span>
          </div>
        </div>
        <div class="marketServer">
          <div class="serverDesc">
            <span class="serverTitle">起送价</span>
            <p><span class="number">{{seller.minPrice}}</span>元</p>
          </div>
          <div class="serverDesc">
            <span class="serverTitle">商家配送</span>
            <p><span class="number">{{seller.deliveryPrice}}</span>元</p>
          </div>
          <div class="serverDesc">
            <span class="serverTitle">平均配送时间</span>
            <p><span class="number">{{seller.deliveryTime}}</span>分钟</p>
          </div>
        </div>
      </div>
      <SPLICT></SPLICT>
      <div class="saleNotice">
        <h1 class="title">公告与活动</h1>
        <p class="bulletin">{{seller.bulletin}}</p>
        <ul>
          <li class="saleNoticeItem" v-for="(val, index) in seller.supports" :key="index" >
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{val.description}}</span>
          </li>
        </ul>
      </div>
      <SPLICT></SPLICT>
      <div class="shopImg">
        <h1 class="title">商家实景</h1>
        <ul>
          <li class="shopImgItem" v-for="(val, index) in seller.pics" :key="index" >
            <img :src='val'>
          </li>
        </ul>
      </div>
      <SPLICT></SPLICT>
      <div class="shopInfo">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="shopInfoItem" v-for="(val, index) in seller.infos" :key="index">
            <p>{{val}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import SPLICT from '../../common/splict/splict';
  import STAR from '../../common/star/star';
  export default {
    name: 'seller',
    data () {
      return {
        initY: 0,
        scrollY: 0,
        isCollect: false
      };
    },
    mounted () {
      this.scroll = {
        goodItem: {
          scrollY: 0,
          recordY: 0,
          listY: [],
          el: this.$refs.sellerContent,
          cls: '.sellerContent'
        }
      };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      collect () {
        this.isCollect = !this.isCollect;
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
          // moveElm.style.top = re.goodItem.recordY = 0;
          moveElm.style.top = Math.ceil(re.goodItem.scrollY) + 'px';
          // moveElm.style.transition = 'all 0.2s';
          moveElm.style.transition = 'none';
        }
      },
      entScroll (re) {
        var moveElm = re.goodItem.el;
        var ul = re.goodItem.el;
        if (re.goodItem.scrollY < 0) {
          let YY = moveElm.clientHeight - ul.scrollHeight;
          if (Math.abs(re.goodItem.scrollY) >= Math.abs(YY)) {
            re.goodItem.recordY = re.goodItem.scrollY = YY;
            moveElm.style.top = YY + 'px';
            moveElm.style.transition = 'all 0.2s';
          }
        } else {
          if (moveElm.getBoundingClientRect().top > 0) {
            moveElm.style.top = re.goodItem.recordY = 0;
            moveElm.style.transition = 'all 0.5s';
          }
        }
      }
    },
    components: {
      SPLICT,
      STAR
    }
  };
</script>

<style lang="less" scoped>
  @import '../../common/tools/mixin.less';
  .seller {
    position: absolute;
    width: 100%;
    overflow: hidden;
    .px2Rem(top, 174 *2);
    .px2Rem(bottom, 0);
    .px2Rem(padding-bottom,96);
    .sellerContent {
      position: absolute;
      width: 100%;
      height: 100%;
      .market {
        .px2Rem2(padding,36, 36);
        .garde {
          display: flex;
          .border(2,rgba(7,17,27,0.1));
          .gardeInfo {
            .sellerName {
              color: rgb(7, 17,27);
              .px2Rem(font-size,28);
              .px2Rem(line-height,28);
            }
            .gardeContent {
              display: flex;
              .px2Rem4(padding,16,0,30,0);
              .ratingCount {
                .px2Rem4(padding, 0,24,0,16);
                color: rgb(77,85,93);
                .px2Rem(font-size,20);
                .px2Rem(line-height,20);
              }
              .shopCount {
                color: rgb(77,85,93);
                .px2Rem(font-size,20);
                .px2Rem(line-height,20);
              }
            }
          }
          .collect {
            flex: 1;
            text-align: right;
            .icon-xin {
              color: rgba(7,17,27,0.2);
              .px2Rem(font-size,40);
              .px2Rem(line-height,48);
              &.collect {
                color: rgb(240,20,20);
              }
            }
            .collectText {
              display: block;
              color: rgb(77,85,93);
              .px2Rem(font-size,20);
              .px2Rem(line-height,20);
            }
          }
        }
        .marketServer {
          display: flex;
          .px2Rem(padding-top,36);
          .serverDesc {
            flex: 1;
            text-align: center;
            color: rgb(7, 17,27);
            .bd(border-right,2,solid,rgba(7,17,27,0.1));
            .serverTitle {
              color: rgb(147,153,159);
              .px2Rem(font-size,20);
              .px2Rem(line-height,20);
              .px2Rem(padding-bottom,8);
            }
            .number {
              .px2Rem(font-size,48);
              .px2Rem(line-height,48);
            }
          }
        }
      }
      .saleNotice {
          .px2Rem4(padding,36,36,0,36);
        .title {
          color: rgb(7, 17,27);
          .px2Rem(font-size,28);
          .px2Rem(line-height,28);
        }
        .bulletin{
          color: rgb(240,20,20);
          .px2Rem4(padding,16,24,32,24);
          .px2Rem(font-size,24);
          .px2Rem(line-height,48);
          .bd(border-bottom,2,solid,rgba(7,17,27,0.1));
        }
        .saleNoticeItem {
          .px2Rem2(padding,32,24);
          .px2Rem(line-height, 32);
          .bd(border-bottom,2,solid,rgba(7,17,27,0.1));
          .icon {
            display: @dib;
            .wh(32,32);
            .px2Rem(margin-right,12);
            .px2Rem(background-size,32);
            background-repeat: no-repeat;
            &.decrease {
              .bgImg('../../components/seller/images/decrease_4');
            }
            &.discount {
              .bgImg('../../components/seller/images/discount_4');
            }
            &.guarantee {
              .bgImg('../../components/seller/images/guarantee_4');
            }
            &.invoice {
              .bgImg('../../components/seller/images/invoice_4');
            }
            &.special {
              .bgImg('../../components/seller/images/special_4');
            }
          }
          .text {
              vertical-align: top;
              .px2Rem(font-size, 24);
              color: rgb(7,17,27);
            }
          &:last-child {
            border-bottom: none;
          }
        }
      }
      .shopImg {
        .px2Rem2(padding,32,32);
        .title {
          .saleNotice.title;
        }
        ul {
          .px2Rem(height,180);
          overflow: hidden;
          .shopImgItem {
            display: @dib;
            .px2Rem(padding-right,12);
            .px2Rem(padding-top,24);
            img {
              .wh(240,180);
            }
          }
        }
      }
      .shopInfo {
        .px2Rem4(padding,32,24,0,24);
        .px2Rem(line-height, 32);
        .title {
          .saleNotice.title;
          .px2Rem(padding-bottom,24);
        }
        .shopInfoItem {
          .px2Rem2(padding,32,24);
          .px2Rem(line-height, 32);
          .bd(border-bottom,2,solid,rgba(7,17,27,0.1));
           &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
