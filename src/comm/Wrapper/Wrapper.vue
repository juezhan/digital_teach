<template>
  <div class="wrapper">
    <div class="hd"><i v-if="icon.length" :class="icon"></i>{{title}}</div>
    <div class="bd">
      <slot></slot>
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
    methods: {},
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
    }
  }
</style>
