<template>
  <div class="header">
   <div class="content">
     <div class="avatar">
       <img :src="seller.avatar" alt="">
     </div>
     <div class="c-content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
     </div>
     <div class="count" v-if="seller.supports" @click="showDetail()">
       <span class="sum">{{seller.supports.length}}个</span>
       <i class="icon iconfont icon-jiantou"></i>
     </div>
   </div>
   <div class="banner" @click="showDetail()">
     <span class="bannerImg"></span>
     <span class="bannerText">{{seller.bulletin}}</span>
     <i class="bannerIcon iconfont icon-jiantou"></i>
   </div>
   <div class="background">
     <img :src="seller.avatar" alt="">
   </div>
    <transition  enter-active-class="animated zoomInDown" leave-active-class="animated bounceOutRight" >
      <div v-show="detailShow" class="detail">
        <div class="c_warp" >
          <div class="c_c">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-warp">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="info">
              <p>优惠信息</p>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="supports-item" v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="info">
              <p>商家公告</p>
            </div>
            <div class="s_in">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detailColse">
          <span class=" icon iconfont icon-close" @click="showDetail()"></span>
          </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import star from '@/common/star/star';
  export default {
    name: 'headTop',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false,
        initY: 0,
        scrollY: 0
      };
    },
    mounted () {
      this.scroll = {
        goodItem: {
          scrollY: 0,
          recordY: 0,
          listY: [],
          el: this.$refs.c_c,
          cls: '.c_c'
        }
      };
    },
    methods: {
      showDetail () {
        this.detailShow = !this.detailShow;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>
<style lang="less" scoped>
  @import '../../common/tools/mixin.less';
  .header {
    color: #fff;
    position: relative;
    overflow: hidden;
    background-color:rgba(7,17,25,0.5);
    .content {
      position: relative;
      .px2Rem4(padding, 48, 24, 36, 48);
      font-size: 0;
      .avatar {
        display: @dib;
        vertical-align: top;
        img {
        .px2Rem(border-radius,4);
          .wh(128, 128);
        }
      }
      .c-content {
        display: @dib;
        .px2Rem(margin-left, 32);
        .title {
          .px2Rem4(margin, 4, 0, 16, 0);
          .brand {
            display: @dib;
            .wh(60, 36);
            .bgImg('../header/images/brand');
            .px2Rem2(background-size, 60, 36);
          }
          .name {
            font-weight: bold;
            color: rgb(255,255,255);
            .px2Rem(margin-left,12);
            .px2Rem(font-size, 32);
            .px2Rem(line-height, 36);
            vertical-align: top;
          }
        }
        .description {
          color: rgb(255,255,255);
          .px2Rem(font-size, 24);
          .px2Rem(line-height,24);
          .px2Rem(margin-bottom, 20);
        }
        .supports{
          .icon {
            .wh(24,24);
            .px2Rem(margin-right,8);
            .px2Rem2(background-size,24,24);
            display:@dib;
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
          .text{
            .description;
            vertical-align: top;
            .px2Rem(font-size, 20);
            .px2Rem(line-height, 24);
            margin: 0;
          }
        }
      }
      .count {
        position: absolute;
        color: #fff;
        .px2Rem(right, 24);
        .px2Rem(bottom, 36);
        .px2Rem2(padding, 0, 16);
        .px2Rem(line-height, 24);
        .px2Rem(border-radius, 16);
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .sum {
          display: @dib;
          .px2Rem(margin-top, 10);
          .px2Rem(font-size,20);
        }
        .icon {
          .px2Rem(font-size,20);
          .px2Rem(margin-left, 8);
        }
      }
    }
    .banner {
      .px2Rem(height, 56);
      .px2Rem(line-height, 56);
      .px2Rem4(padding,0, 32,0,24);
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
      background-color: rgba(7,17,25,0.2);
      .bannerImg {
        display: @dib;
        .wh(44,24);
        .px2Rem(margin-top, 14);
        .bgImg('../header/images/bulletin');
        .px2Rem2(background-size, 44, 24);
        background-repeat: no-repeat;
      }
      .bannerText {
        .px2Rem(font-size, 20);
        .px2Rem(line-height, 56);
        .px2Rem2(margin,0,8);
        color: rgb(255, 255, 255);
        vertical-align: top;
      }
      .bannerIcon {
        position: absolute;
        .px2Rem(right, 24);
        .px2Rem(font-size, 14);
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      .px2Rem(width, 10000%);
      .px2Rem(height, 10000%);
      z-index: -999;
      filter:blur(10px);
      img {
       .px2Rem(width, 10000%);
       .px2Rem(height, 10000%);
      }
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      width:100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(7, 17, 27, 0.8);
      .c_warp {
        min-height:100%;
        height: auto;
        .c_c {
          .px2Rem(margin-top, 128);
          .px2Rem(padding-bottom, 128);
          .name {
            .px2Rem(line-height, 32);
            .px2Rem(font-size, 32);
            font-weight: 700;
            color:rgb(255,255,255);
            text-align: center;
          }
          .star-warp {
            .px2Rem(margin-top,32);
            .px2Rem(margin-bottom,56);
            text-align: center;
          }
          .info {
            width: 80%;
            margin: 0 auto;
            text-align: center;
            p {
              .px2Rem(font-size, 32);
              font-weight: 700;
              color:rgb(255,255,255);
              .px2Rem(margin-bottom,48);
              .border(4,rgba(255, 255, 255, 0.2));
              .border(4,rgba(255, 255, 255, 0.2),before);
              &:after {
                width: 40%;
                .px2Rem(left, -40);
                .px2Rem(bottom, 12);
              }
              &:before {
                width: 40%;
                left: 68%;
                .px2Rem(bottom, 12);
              }
            }
          }
          .supports {
            width: 80%;
            margin: auto;
            .supports-item {
              .px2Rem2(padding, 0, 24);
              .px2Rem(margin-bottom, 24);
              &:last-child {
                .px2Rem(margin-bottom, 56);
              }
              .icon {
                display: @dib;
                .wh(32,32);
                .px2Rem(margin-right,12);
                .px2Rem(background-size,32);
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
              .text {
                vertical-align: top;
                .px2Rem(font-size, 24);
                color: rgb(255,255,255);
                .px2Rem(line-height, 24);
              }
            }
          }
          .s_in {
            width: 80%;
            margin: auto;
            color: rgb(255,255,255);
            .px2Rem(margin-top, 48);
            .px2Rem(margin-bottom, 48);
            .px2Rem2(padding, 0, 24);
            .px2Rem(font-size, 24);
            .px2Rem(line-height, 48);
            .px2Rem(letter-spacing, 4);
          }
        }
      }
      .detailColse {
        .px2Rem(height, 128);
        .px2Rem(margin-top, -128);
        left: 50%;
        position:  absolute;
        clear: both;
        text-align: center;
        .icon {
          .px2Rem(font-size, 64);
          color:rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
</style>
