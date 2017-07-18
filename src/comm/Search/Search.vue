<template>
  <div class="search">
    <div class="hd">
      <i class="iconfont icon-query"></i>{{title}}
    </div>
    <div class="bd">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" type="text/scss">
  @import "../../assets/Scss/Color";

  .search {
    margin: 5px;
    .hd {
      background-color: $bg-color_1;
      color: $txt-color_1;
      line-height: 44px;
      padding: 0 15px;
      text-align: left;
    }
    .bd {
      border: 1px solid $border-color_1;
      font-size: 0;
      padding: 5px 15px;
      text-align: left;
    }

    .el-form-item {
      margin-bottom: 0;
    }
    .el-button {
      .iconfont {
        font-size: 14px;
      }
    }

  }
</style>
<script>
  export default{
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    mounted() {
    },
    methods: {},
    components: {},
    computed: {}
  }
</script>
