<template>
  <el-dialog :title="title" :visible.sync="visible" class="dialog-form"
             :before-close="close">
    <slot></slot>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        title: '',
        visible: false
      }
    },
    methods: {
      open(title) {
        this.title = title
        this.visible = true
      },
      close() {
        this.visible = false
      }
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>

  .dialog-form {
    text-align: left;
  }
</style>
