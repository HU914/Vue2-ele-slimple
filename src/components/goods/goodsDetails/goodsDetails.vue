<template>
<transition  enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" >
  <div class="goodWrapper"  v-show="isActive">
    <div class="goodsDetails"  ref="goodsDetails"  @touchstart= 'initScrollData($event, scroll)' @touchmove = "startScroll($event, scroll)" @touchend= "entScroll(scroll)">
      <div class="imgHeader">
        <img :src="food.image" alt="">
        <div>
          <span class="iconfont icon-back" @touchstart="showBlock"></span>
        </div>
      </div>
      <div class="goodContent">
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="extra">
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span>￥<span class="p-price">{{food.price}}</span></span>
            <span v-if="food.oldPrice" class="p-floor">￥{{food.oldPrice}}</span>
            <div class="prizeWrapper">
              <PRICE :food='food' v-if="food.count || !food.count === 0"></PRICE>
                <div class="addCart" v-if="!food.count || food.count === 0" @touchstart='addFoot'>
                  <span>加入购物车</span>
                </div>
            </div>
          </div>
        </div>
        <SPLICT></SPLICT>
        <div class="goodIntroduce">
          <h1 class="title">商品介绍</h1>
          <aside>
            <p class="text">{{food.info}}</p>
          </aside>
        </div>
        <SPLICT></SPLICT>
        <div class="goodsRating">
          <h1 class="title">商品评价</h1>
          <RATING :desc='desc' :selectType='selectType' :onlyContent='onlyContent' :ratings='food.ratings' @ratingstype="transfrom" @ratingsOnContent="toggleContent"></RATING>
          <div class="ratingsContent">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="ratingItem" v-show="needShow(val.rateType,val.text)" v-for="(val, index) in food.ratings" :key="index">
                <div>
                  <p class="itemTime">{{val.rateTime | formatDate}}</p>
                  <p class="itemUserInfo">{{val.username}}<img :src="val.avatar"></p>
                </div>
                <p class="ratingText"><span class="iconfont" :class="[itive(val) ? 'icon-zan4' : 'icon-zan']"></span>{{val.text}}</p>
              </li>
            </ul>
            <div class="noRating" v-if="!food.ratings || !food.ratings.length">
              <p>暂无评价!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
  import Vue from 'vue';
  import PRICE from '../../../common/price/price';
  import SPLICT from '../../../common/splict/splict';
  import RATING from '../../../common/rating/rating';
  import {formatDate} from '@/common/js/HQ';
  const ALL = 2;
  export default {
    name: 'goodsDetails',
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        isActive: false,
        selectType: ALL,
        onlyContent: false,
        initY: 0,
        scrollY: 0,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    mounted () {
      this.scroll = {
        goodItem: {
          scrollY: 0,
          recordY: 0,
          listY: [],
          el: this.$refs.goodsDetails,
          cls: '.goodsDetails'
        }};
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    methods: {
      showBlock () {
        this.isActive = !this.isActive;
        this.selectType = 2;
        this.onlyContent = true;
      },
      transfrom (type) {
        this.selectType = type;
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent;
      },
      addFoot () {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      itive (val) {
        if (val.rateType) {
          return true;
        }
        return false;
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        };
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
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
      PRICE,
      SPLICT,
      RATING
    }
  };
</script>
<style lang="less" scoped>
  @import '../../../common/tools/mixin.less';
  .goodWrapper {
    position: fixed;
    top: 0;
    .px2Rem(bottom,96);
    width: 100%;
    // height: 100%;
    z-index: 10;
    background-color:#fff;
    .goodsDetails {
      position: absolute;
      .px2Rem(bottom,0);
      top: 0;
      width: 100%;
      height: 100%;
      .imgHeader {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
        }
        .icon-back {
          position: fixed;
          display: @dib;
          color: #fff;
          text-align: center;
          .wh(50,50);
          .px2Rem(top, 20);
          .px2Rem(left,20);
          .px2Rem(font-size,40);
          .px2Rem(line-height,50);
        }
      }
      .goodContent {
        background-color:#fff;
        .content {
          .px2Rem2(padding, 36, 36);
          .title {
            color: rgb(7,17,27);
            font-weight: 700;
            .px2Rem(line-height, 28);
            .px2Rem(margin-bottom, 16);
            .px2Rem(font-size, 28);
          }
          .extra {
            .px2Rem(margin-bottom, 36);
            .px2Rem(line-height, 20);
            .px2Rem(font-size, 0);
            .sellCount,.rating {
              .px2Rem(font-size, 20);
              color:rgb(147,153,159);
            }
            .sellCount {
              .px2Rem(margin-right,24)
            }
          }
          .price {
            color: red;
            position: relative;
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
            .prizeWrapper {
              display: @dib;
              position: absolute;
              .px2Rem(right, 0);
              .wh(1478,48);
              .addCart {
                z-index: 18;
                color: #fff;
                text-align: center;
                position: absolute;
                background-color: rgb(0,160,220);
                .wh(148,48);
                .px2Rem(right, 36);
                .px2Rem(bottom, 0);
                .px2Rem(font-size, 20);
                .px2Rem(line-height, 48);
                .px2Rem(border-radius, 24);
                .px2Rem2(padding,0, 24);
              }
              .buy {
                .px2Rem(right, 0);
                .px2Rem(bottom, 0);
              }
            }
          }
        }
        .goodIntroduce {
          .px2Rem2(padding,36, 36);
          .title {
             .content .title;
            .px2Rem(margin-bottom,12);
          }
          .text {
            color:rgb(77,85,93);
            .px2Rem(font-size, 24);
            .px2Rem(line-height, 48);
            .px2Rem2(margin,0, 16);
          }
        }
        .goodsRating {
          .title {
            .content .title;
            .px2Rem2(padding,0, 36);
            .px2Rem(margin-bottom,12);
          }
          .ratingsContent {
            ul {
              .px2Rem2(padding,0, 36);
              .ratingItem {
                .px2Rem2(padding,36, 0);
                .border(2,rgba(7,17,27,0.1));
                div {
                  display: flex;
                  .itemTime {
                    flex: 4;
                    color: rgb(147,153,159);
                    .px2Rem(font-size,20);
                    .px2Rem(line-height,20);
                    .timeMin {
                      .px2Rem(margin-left,8);
                    }
                  }
                  .itemUserInfo {
                    flex: 1;
                    text-align: right;
                    .itemTime;
                    img{
                      border-radius: 50%;
                      vertical-align: middle;
                      .wh(24,24);
                      .px2Rem(margin-left,12);
                    }
                  }
                }
                .ratingText {
                  .px2Rem(padding-top,12);
                  .px2Rem(font-size,24);
                  .px2Rem(line-height,32);
                  .icon-zan4{
                    display: @dib;
                    color: rgb(147,153,159);
                    .px2Rem(line-height,48);
                    .px2Rem(margin-right,8);
                    vertical-align: middle;
                  }
                  .icon-zan{
                    .icon-zan4;
                    color: rgb(0,160,220);
                  }
                }
              }
            }
            .noRating {
              color: rgb(147,153,159);
              .px2Rem2(padding,36,36);
              .px2Rem(font-size,16);
            }
          }
        }
      }
    }
  }
</style>
