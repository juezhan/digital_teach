<template>
  <el-form ref="dialogForm" :model="form" :rules="rules" :label-width="labelWidth">
    <el-form-item v-if="isView" label="类型" prop="type">
      <el-input v-model="form.type" :readonly="isView" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item v-else label="类型" prop="type">
      <el-select v-model="form.type">
        <el-option v-for="item in form.types" :key="item.name" :label="item.name"
                   :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标签名" prop="label">
      <input type="hidden" v-model="form.id"/>
      <el-input v-model="form.label" placeholder="请输入标签名" :readonly="isView"
                auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.description" :readonly="isView"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  import {getDC} from 'api/base'
  import {ScheduleDictsTypesList, ScheduleDicts} from 'api/config'
  import axiosRequest from 'axiosjs/axios-request'
  import Message from 'js/message'

  const DIALOG_FORM_TYPES_KEY = 'ScheduleDictDialogFormTypes'

  export default {
    props: {
      labelWidth: {
        type: String,
        default: '80px'
      },
      isView: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 对话框表单
        form: {
          id: 0,
          type: '',
          label: '',
          description: '',
          types: []
        },
        // 对话框表单验证项
        rules: {
          type: [
            {required: true, message: '请选择类型', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '请输入标签名', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this._getTypes()
    },
    methods: {
      _getTypes() {
        // 加载类型选项
        let that = this
        if (sessionStorage.getItem(DIALOG_FORM_TYPES_KEY)) {
          that.form.types = JSON.parse(sessionStorage.getItem(DIALOG_FORM_TYPES_KEY))
          return
        }
        let _data = {
          _dc: getDC(),
          query: '',
          page: 1,
          start: 0,
          limit: 25
        }
        axiosRequest.get({
          url: ScheduleDictsTypesList,
          params: _data
        }).then(response => {
          that.form.types = response.data
          sessionStorage.setItem(DIALOG_FORM_TYPES_KEY, JSON.stringify(response.data))
        })
      },
      formCancel () {
        console.log('formCancel')
      },
      dialogFormCancel () {
        console.log('dialogFormCancel')
        this.$emit('dialogFormCancel')
      },
      dialogFormSubmit () {
//        console.log(this.$parent.$refs.kalixDialog.close())
//        提交对话框
        let that = this
        that.$refs.dialogForm.validate((valid) => {
          if (valid) {
            let _data = {
              id: that.form.id,
              description: that.form.description,
              label: that.form.label,
              type: that.form.type
            }
            axiosRequest.post({
              url: ScheduleDicts,
              params: {_dc: getDC()},
              data: _data
            }).then(response => {
              if (response.data.success) {
                Message.success(response.data.msg)
                // 关闭对话框
                that.dialogFormCancel()
                // 刷新列表
                this.$emit('refreshData')
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
</style>
