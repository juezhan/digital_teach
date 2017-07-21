<template>
  <div class="wrapper">
    <div class="hd"><i v-if="icon.length" :class="icon"></i>{{title}}</div>
    <div class="bd">
      <div class="toolbar">
        <slot name="toolbar"></slot>
      </div>
      <div class="container" ref="wrapperContainer">
        <slot name="container"></slot>
      </div>
      <div class="pagination">
        <slot name="pagination"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    methods: {
      getContainerHeight() {
        return this.$refs.wrapperContainer.scrollHeight
      }
    },
    components: {},
    computed: {}
  }
</script>

<style lang="scss" type="text/scss">
  @import "../../assets/Scss/Color";

  .wrapper {
    margin: 5px;
    border: 1px solid $border-color_1;
    position: absolute;
    bottom: 0;
    top: 96px;
    left: 0;
    box-sizing: border-box;
    right: 0;
    .hd {
      background-color: $bg-color_1;
      color: $txt-color_1;
      line-height: 44px;
      padding: 0 15px;
      text-align: left;
    }
    .bd {
      .toolbar {
        padding: 12px;
        text-align: left;
        .el-button {
          .iconfont {
            font-size: 14px;
          }
        }
      }
      .container {
        position: absolute;
        padding: 0 12px;
        overflow: hidden;
        bottom: 48px;
        right: 0;
        left: 0;
        top: 104px;
        text-align: left;
      }
      .pagination {
        text-align: left;
        padding: 8px 0;
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>
