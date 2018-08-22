<template>
  <div class="ratings">
    <div class="ratingsConent" ref="ratingsConent"  @touchstart= 'initScrollData($event, scroll)' @touchmove = "startScroll($event, scroll)" @touchend= "entScroll(scroll)">
      <div class="overview">
        <div class="overviewLeft">
          <p class="grade">{{seller.score}}</p>
          <p class="gradeText">综合评分</p>
          <p class="gradeDescribe">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="overviewRight">
          <p class="gradeLevel">
            <span class="title">服务态度</span>
            <STAR :size='36' :score='seller.serviceScore'></STAR>
            <span class="gradeNum">{{seller.serviceScore}}</span>
          </p>
          <p class="gradeLevel">
            <span class="title">商品评分</span>
            <STAR :size='36' :score='seller.foodScore'></STAR>
            <span class="gradeNum">{{seller.foodScore}}</span>
          </p>
          <p class="gradeLevel">
            <span class="title">送达时间</span>
            <span class="gradeTime">{{seller.deliveryTime}}分钟</span>
          </p>
        </div>
      </div>
      <SPLICT></SPLICT>
      <RATING :desc='desc' :selectType='selectType' :onlyContent='onlyContent' :ratings='ratings' @ratingstype="transfrom" @ratingsOnContent="toggleContent"></RATING>
      <div class="ratingsList">
        <ul>
          <li  class="ratingItem" v-show="needShow(val.rateType,val.text)" v-for="(val, index) in ratings" :key="index">
            <span class="userImg">
              <img :src="val.avatar">
            </span>
            <div class="ratingWrapper">
              <div class="fistTexrt">
                <span class="userInfo">{{val.username}}</span>
                <span class="time">{{val.rateTime | formatDate}}</span>
              </div>
              <div class="gradeContent">
                <STAR :size='24' :score='val.score'></STAR>
                <span class="deliveryTime">{{val.deliveryTime}}分钟送达</span>
              </div>
              <div class="ratingText">
                <p>{{val.text}}</p>
                <p v-if="!val.text">此用户没有评价</p>
              </div>
              <div class="ratingTag">
                <i class="iconfont" :class="[itive(val) ? 'icon-zan4' : 'icon-zan']"></i>
                <ul>
                  <li class="recommendItem" v-for="(val, index) in val.recommend.slice(0,2)" :key="index">
                    <span>{{val}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <div class="noRating" v-if="!ratings || !ratings.length">
          <p>暂无评价!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SPLICT from '../../common/splict/splict';
  import STAR from '../../common/star/star';
  import RATING from '../../common/rating/rating';
  import {formatDate} from '@/common/js/HQ';
  const ALL = 2;
  export default {
    name: 'ratings',
    data () {
      return {
        initY: 0,
        scrollY: 0,
        ratings: [],
        selectType: ALL,
        onlyContent: false,
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
          el: this.$refs.ratingsConent,
          cls: '.ratingsConent'
        }
      };
    },
    created () {
      this.axios
      .get('ratings')
      .then(re => {
        this.ratings = re.data.data;
      });
    },
    props: {
      seller: {
        type: Object
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    methods: {
      transfrom (type) {
        this.selectType = type;
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent;
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
      SPLICT,
      RATING,
      STAR
    }
  };
</script>

<style lang="less" scoped>
  @import '../../common/tools/mixin.less';
  .ratings {
    position: absolute;
    width: 100%;
    overflow: hidden;
    .px2Rem(top, 174 * 2);
    .px2Rem(bottom, 0);
    .px2Rem(padding-bottom,96);
    .ratingsConent {
      position: absolute;
      width: 100%;
      height: 100%;
      .overview {
        .px2Rem2(padding, 36,0);
        .overviewLeft {
          display: @dib;
          text-align: center;
          .px2Rem(width,240);
          .bd(border-right,2,solid, rgba(7,17,27,0.1));
          .grade {
            color: rgb(255,153,0);
            .px2Rem(font-size,40);
            .px2Rem(line-height,56);
          }
          .gradeText {
            color: rgb(7,17,27);
            font-weight: 600;
            .px2Rem4(padding,12,0, 16,0);
            .px2Rem(font-size,24);
            .px2Rem(line-height,24);
          }
          .gradeDescribe {
            color: rgb(7,17,27);
            .px2Rem(font-size,20);
            .px2Rem(line-height,20);
          }
        }
        .overviewRight {
          display: @dib;
          .px2Rem(padding-left,12);
          .gradeLevel {
            display: flex;
            .px2Rem(padding-bottom,16);
            .title {
              font-weight: 600;
              .px2Rem(padding-right,12);
              .px2Rem(font-size,24);
              .px2Rem(line-height,36);
            }
            .gradeNum {
              color: rgb(255,153,0);
              .px2Rem(padding-left,12);
              .px2Rem(font-size,24);
              .px2Rem(line-height,36);
            }
            .gradeTime {
              .gradeNum;
                color: rgb(147,150,159);
                .px2Rem(padding-left,0);
            }
          }
        }
      }
    }
    .ratingsList {
      ul {
        .px2Rem2(padding,0, 36);
        .ratingItem {
          display: flex;
          .px2Rem2(padding,36, 0);
          .border(2,rgba(7,17,27,0.1));
          .userImg {
            img {
              border-radius: 50%;
              vertical-align: middle;
              .wh(56,56);
              .px2Rem(margin-right,24);
            }
          }
          .ratingWrapper {
            .px2Rem(width,244 * 2);
            .fistTexrt {
              display: flex;
              .userInfo {
                flex: 1;
                color:rgb(7,17,27);
                .px2Rem(font-size,20);
                .px2Rem(line-height,24);
              }
              .time {
                .userInfo;
                color: rgb(147,153,159);
              }
            }
            .gradeContent {
              display: flex;
              .px2Rem4(padding,8,0,12,0);
              .deliveryTime {
                .fistTexrt .time;
                .px2Rem(padding-left,12);
              }
            }
            .ratingText {
              p {
                color: rgb(7,17,27);
                font-weight: 600;
                .px2Rem(font-size,24);
                .px2Rem(line-height,36);
                .px2Rem(padding-bottom,16);
              }
            }
            .ratingTag {
              display: flex;
              overflow: hidden;
              .icon-zan4{
                .px2Rem(line-height,32);
                .px2Rem(font-size,24);
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
              .recommendItem {
                display: @dib;
                color: rgb(147,150,159);
                background-color: #fff;
                .px2Rem2(padding,0,12);
                .bd(border,2,solid,rgba(7,17,27,00.1));
                .px2Rem(margin-right,16);
                .px2Rem(border-radius,2);
                .px2Rem(font-size,18);
                .px2Rem(line-height ,32);
              }
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
</style>
