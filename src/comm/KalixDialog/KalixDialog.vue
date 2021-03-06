<template>
  <el-dialog :title="title" :visible="visible" class="dialog-form"
             :before-close="close">
    <el-form ref="dialogForm">
      <slot name="dialog-container"></slot>
    </el-form>
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
  import Message from 'js/message'
  import axiosRequest from 'axiosjs/axios-request'

  export default {
    props: {
      dataUrl: {
        type: String,
        required: true
      },
      formModel: {
        type: Object,
        required: true
      },
      rules: {
        type: Object,
        required: true
      },
      labelWidth: {
        type: String,
        default: '80px'
      },
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
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
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
        setTimeout(() => {
          let targetForm = this.$parent.$refs[this.formName]
          targetForm.init(isView)
        }, 20)
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
          return
        }
        let that = this
        that.$refs.dialogForm.validate((valid) => {
          if (valid) {
            axiosRequest.post({
              url: this.dataUrl,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
                Message.success(response.data.msg)
                // 关闭对话框
                this.close()
                // 刷新列表
                this.$emit('refreshData')
                // 清空form
                this.$parent.resetDialogForm()
//                this.$emit('resetDialogForm')
              } else {
                Message.error(response.data.msg)
              }
            })
          } else {
            Message.error('')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>

  .dialog-form {
    text-align: left;
  }
</style>
