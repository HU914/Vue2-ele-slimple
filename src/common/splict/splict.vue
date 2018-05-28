<template>
  <div class="splict">
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="less" scoped>
    @import '../../common/tools/mixin.less';
    .splict {
      widows: 100%;
      .px2Rem(height,32);
      .bd(border-top, 2, solid, rgba(7,17,27,0.1));
      .bd(border-bottom, 2, solid, rgba(7,17,27,0.1));
      background-color: #f3f5f7;
    }
</style>
