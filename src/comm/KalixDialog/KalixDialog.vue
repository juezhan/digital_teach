<template>
  <el-dialog :title="title" :visible="visible" class="dialog-form"
             :before-close="close">
    <slot name="dialog-container"></slot>
    <div slot="footer" class="dialog-footer">
      <template v-if="isView">
        <el-button type="primary" @click="clickCancel">关 闭</el-button>
      </template>
      <template v-else>
        <el-button @click="clickCancel">取 消</el-button>
        <el-button type="primary" @click="clickSubmit">提 交</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      formName: {
        type: String,
        default: ''
      },
      handlerButtonCancel: {
        type: String,
        default: 'dialogFormCancel'
      },
      handlerButtonSubmit: {
        type: String,
        default: 'dialogFormSubmit'
      }
    },
    data() {
      return {
        title: '',
        visible: false,
        isView: false
      }
    },
    created() {
      this.parentForm = this.$parent.$refs[this.formName]
    },
    mounted() {
    },
    activated() {
    },
    methods: {
      open(title, isView) {
        this.title = title
        this.visible = true
        if (isView) {
          this.isView = isView
        }
      },
      close() {
        this.visible = false
      },
      clickCancel () {
        let targetForm = this.$parent.$refs[this.formName]
        if (typeof (targetForm[this.handlerButtonCancel]) === 'function') {
          targetForm[this.handlerButtonCancel]()
        } else {
          this.close()
        }
      },
      clickSubmit () {
        let targetForm = this.$parent.$refs[this.formName]
        if (typeof (targetForm[this.handlerButtonSubmit]) === 'function') {
          targetForm[this.handlerButtonSubmit]()
        }
      }
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>

  .dialog-form {
    text-align: left;
  }
</style>
