<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
  </div>
</template>
<style lang="less" scoped>
  @import '../tools/mixin.less';
  .star {
    font-size: 0;
    .star-item {
      display: @dib;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        .wh(40, 40);
        .px2Rem(margin-right, 44);
        .px2Rem(background-size, 40);
        &.on {
          .bgImg('../star/images/star48_on');
        }
        &.half {
          .bgImg('../star/images/star48_half');
        }
        &.off {
          .bgImg('../star/images/star48_off');
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    &.star-36 {
      .star-item {
        .wh(30, 30);
        .px2Rem(margin-right, 12);
        .px2Rem(background-size, 30);
        &.on {
          .bgImg('../star/images/star36_on');
        }
        &.half {
          .bgImg('../star/images/star36_half');
        }
        &.off {
          .bgImg('../star/images/star36_off');
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    &.star-24 {
      .star-item {
        .wh(20, 20);
        .px2Rem(margin-right, 6);
        .px2Rem(background-size, 20);
        &.on {
          .bgImg('../star/images/star24_on');
        }
        &.half {
          .bgImg('../star/images/star24_half');
        }
        &.off {
          .bgImg('../star/images/star24_off');
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    name: 'star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      itemClasses () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>
