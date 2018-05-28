<template>
  <div class="ratingSelect">
    <div class="ratingType">
      <div class="block goodsAll" :class="{active:selectType===2}" @click="select(2)">
        <span class="text">{{desc.all}}</span>
        <span class="ratingSum">{{ratings.length}}</span>
      </div>
      <div  class="block goodPositive" :class="{active:selectType===0}"  @click="select(0)">
        <span class="text">{{desc.positive}}</span>
        <span class="ratingSum">{{positive.length}}</span>
      </div>
      <div class="block goodNegative" :class="{active:selectType===1}"  @click="select(1)">
        <span class="text">{{desc.negative}}</span>
        <span class="ratingSum">{{negaitive.length}}</span>
      </div>
    </div>
    <div class="switch">
      <span class="iconfont icon-gou" :class="{active:onlyContent}" @touchstart='toggleContent'></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  const ALL = 2;
  const POSITIVE = 0;
  const NEGAITIVE = 1;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positive () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negaitive () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGAITIVE;
        });
      }
    },
    methods: {
      select (type) {
        this.$emit('ratingstype', type);
      },
      toggleContent () {
        this.$emit('ratingsOnContent', this.onlyContent);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../../common/tools/mixin.less';
  .ratingSelect {
    .px2Rem(padding-top,24);
    .ratingType {
      .px2Rem2(margin,0, 36);
      .px2Rem(padding-bottom,36 );
      .border(2,rgba(7,17,27,0.1));
      .block {
        display: @dib;
        color: rgb(77,85,93);
        background-color: rgb(0,160,220);
        .px2Rem2(padding,16,24);
        .px2Rem(margin-right,24);
        .px2Rem(border-radius,4);
        .px2Rem(line-height,32);
        .text {
          font-weight: 700;
          .px2Rem(font-size,28);
        }
        .ratingSum {
          .px2Rem(font-size,16);
        }
        &.active {
          color: #fff;
        }
        &.goodPositive {
          background-color: rgba(0,160,220,0.2);
          &.active {
            background-color: rgb(0,160,220);
          }
        }
        &.goodNegative {
          background-color: rgba(77,85,93,0.2);
          &.active {
            background-color: rgb(77,85,93);
          }
        }
      }
    }
    .switch{
      .px2Rem2(padding,24, 36);
      .border(2,rgba(7,17,27,0.1));
      .icon-gou {
        color: rgb(147,153,159);
        vertical-align: middle;
        .px2Rem(font-size, 24);
        .px2Rem(line-height, 48);
        &.active {
          color: rgb(0,160,220);
        }
      }
      .text {
        .px2Rem(font-size,24);
        .px2Rem(line-height,48);
        .px2Rem(margin-left,8);
      }
    }
  }
</style>
