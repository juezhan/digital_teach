<template>
  <div class="kalix-talbe-buttons">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
//  import axiosRequest from '../../axios/axios-request'
//  import {getDC} from '../../api/base'
  export default {
    props: {
      dataUrl: {
        type: String,
        default: ''
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>
  .kalix-talbe-buttons {
  }
</style>
