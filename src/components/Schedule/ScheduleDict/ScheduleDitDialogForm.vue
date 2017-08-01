<template>
  <div>
    <el-form-item v-if="isView" label="类型" prop="type">
      <el-input v-model="formModel.type" :readonly="isView" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item v-else label="类型" prop="type">
      <el-select v-model="formModel.type" @visible-change="visibleChange">
        <el-option v-for="item in formModel.types" :key="item.name" :label="item.name"
                   :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标签名" prop="label">
      <input type="hidden" v-model="formModel.id"/>
      <el-input v-model="formModel.label" placeholder="请输入标签名" :readonly="isView"
                auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="formModel.description" :readonly="isView"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"></el-input>
    </el-form-item>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ScheduleDictsTypesList} from 'api/config'
  import axiosRequest from 'axiosjs/axios-request'

  const DIALOG_FORM_TYPES_KEY = 'ScheduleDictDialogFormTypes'

  export default {
    props: {
      isView: {
        type: Boolean,
        default: false
      },
      formModel: {
        type: Object
      }
    },
    data() {
      return {
        // 对话框表单
      }
    },
    mounted() {
//      console.log(this.$parent.$parent.formModel)
//      this._getTypes()
    },
    updated() {
    },
    methods: {
      init() {
      },
      visibleChange() {
        this._getTypes()
      },
      _getTypes() {
        // 加载类型选项
        let that = this
        if (sessionStorage.getItem(DIALOG_FORM_TYPES_KEY)) {
          that.formModel.types = JSON.parse(sessionStorage.getItem(DIALOG_FORM_TYPES_KEY))
          return
        }
        let _data = {
          query: '',
          page: 1,
          start: 0,
          limit: 25
        }
        axiosRequest.get({
          url: ScheduleDictsTypesList,
          params: _data
        }).then(response => {
          that.formModel.types = response.data
          sessionStorage.setItem(DIALOG_FORM_TYPES_KEY, JSON.stringify(response.data))
        })
      },
      formCancel () {
        console.log('formCancel')
      },
      dialogFormCancel () {
        console.log('dialogFormCancel')
        this.$emit('dialogFormCancel')
      }
    }
  }

</script>

<style scoped lang='scss' type='text/scss'>
</style>
