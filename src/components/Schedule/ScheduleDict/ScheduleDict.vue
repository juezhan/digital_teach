<!--
描述：计划任务 - 系统管理 - 字典管理
开发人：桑杨
开发日期：2017年7月17日
-->
<template>
  <div class="schedule-dict">
    <search ref='mySearch' :title='search.title'>
      <el-form ref="searchForm" :rules="search.rules" :model="search.form" :inline="true" class="search-container">
        <el-form-item label="类型" prop="type">
          <el-input v-model="search.form.type"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchFormSubmit"><i class="iconfont icon-query"></i>查询</el-button>
          <el-button type="success" @click="resetSearchForm"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </search>
    <wrapper ref='myWrapper' :title="'字典列表'" :icon="'iconfont icon-dict-management'"
             :data-url="dataUrl"
             :data-search-obj="search.obj"
             :request-data="requestData"
    >
      <!-- 按钮 -->
      <div slot="toolbar">
        <el-button @click="addData" type="primary"><i class="iconfont icon-add"></i>添加</el-button>
      </div>
      <!-- 列表 -->
      <kalix-table-columns slot="container"></kalix-table-columns>
    </wrapper>
    <!-- 对话框 -->
    <kalix-dialog ref="kalixDialog"
                  :form-name="'kalixScheduleDitDialogForm'"
                  :hander-button-cancle="'dialogFormCancel'"
                  :hander-button-submit="'dialogFormSubmit'">
      <kalix-dialog-form slot="dialog-container"
                         ref="kalixScheduleDitDialogForm"
                         @dialogFormCancel="()=>{$refs.kalixDialog.close()}"
                         @refreshData="()=>{$refs.myWrapper.refresh()}"></kalix-dialog-form>
    </kalix-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getDC} from 'api/base'
  import {ScheduleDicts, ScheduleDictsTypesList, PageConfig} from 'api/config'
  import {strToUnicode} from 'unit/unicode-convert'
  import axiosRequest from 'axiosjs/axios-request'
  import Message from 'js/message'
  import KalixTableButtons from 'comm/Wrapper/KalixTableButtons.vue'
  import KalixTable from 'comm/KalixTable/KalixTable'
  import KalixPager from 'comm/KalixPager/KalixPager'
  import KalixTableColumns from './ScheduleDictTableColumns.vue'
  import KalixScheduleDitDialogForm from './ScheduleDitDialogForm.vue'

  let dialogFormTypes = []

  export default {
    data() {
      let validateType = (rule, value, callback) => {
        callback()
//        if (!value) {
//          this.$message({
//            showClose: true,
//            type: 'info',
//            message: `action: ${value}`
//          })
//          return callback()
//        } else {
//          callback()
//        }
      }
      return {
        dataUrl: ScheduleDicts,
        requestData: {},
        pageLimit: PageConfig.sizes[0],
        // 搜索框
        search: {
          title: '字典查询',
          obj: {},          // 搜索内容
          form: {
            type: ''
          },
          rules: {
            type: [
              {validator: validateType, trigger: 'blur'}
            ]
          }
        },
        // 数据列表
        scheduleDicts: [],
        // 对话框
        dialog: {
          visible: false,
          isDetail: false,
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
      }
    },
    created() {
      this.tableIsScroll = true
      this.roleUrl = ScheduleDicts
      this.defaultDialogForm = JSON.parse(JSON.stringify(this.$data.dialog.form))
      this.requestData = {}
      this.dataDeleteUrl = ScheduleDicts
    },
    mounted() {
    },
    methods: {
      searchFormSubmit() {
        // 查询
        let that = this
        if (that.search.form.type.length > 0) {
          that.requestData = {jsonStr: '{"%type%": "' + strToUnicode(that.search.form.type) + '"}'}
          that.$refs.myWrapper.refresh()
        }
      },
      resetSearchForm() {
        // 重置搜索框
        this.search.obj = {}
        this.$refs.searchForm.resetFields()
        this.$refs.myWrapper.refresh()
      },
      addData() {
        // 打开对话框
        this._showDetail({
          title: '添加',
          isDetail: false
        })
      },
      dialogFormSubmit() {
        // 提交对话框
        let that = this
        that.$refs.dialogForm.validate((valid) => {
          if (valid) {
            let _data = {
              id: that.dialog.form.id,
              description: that.dialog.form.description,
              label: that.dialog.form.label,
              type: that.dialog.form.type
            }
            axiosRequest.post({
              url: ScheduleDicts,
              params: {_dc: getDC()},
              data: _data
            }).then(response => {
              if (response.data.success) {
                Message.success('response.data.msg')
                // 关闭对话框
                that.dialogFormCancel()
                // 刷新列表
                that.$refs.myWrapper.getDataList(true)
              } else {
                Message.error(response.data.msg)
              }
            })
          } else {
            return false
          }
        })
      },
      dialogFormCancel() {
        // 关闭对话框
        this.dialog.isDetail = false
        this.$data.dialog.form = Object.assign({}, this.defaultDialogForm)
        this.$refs.dialogForm.resetFields()
        this.$refs.kalixDialog.close()
      },
      tableView(row) {
        this._showDetail({
          title: '查看',
          isDetail: true,
          row: row
        })
      },
      tableEdit(row) {
        this._showDetail({
          title: '修改',
          isDetail: false,
          row: row
        })
      },
      tableDelete(row) {
        //  删除记录
        axiosRequest.delete({
          url: ScheduleDicts + '/' + row.id,
          params: {_dc: getDC()},
          data: {
            id: row.id
          }
        }).then(response => {
          Message.success(response.data.msg)
          this.$emit('refreshData')
        })
      },
      _getTypes() {
        // 加载类型选项
        let that = this
        if (that.dialog.form.types.length > 0) {
          that.dialog.form.types = dialogFormTypes
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
          that.dialog.form.types = response.data
          dialogFormTypes = response.data
        })
      },
      _showDetail(params) {
        // 显示对话框
        let that = this
        that.dialog.isDetail = params.isDetail
        if (!params.isDetail) {
          that._getTypes()
        }
        if (params.row) {
          let row = params.row
          that.dialog.form.id = row.id
          that.dialog.form.description = row.description
          that.dialog.form.label = row.label
          that.dialog.form.type = row.type
        }
        that.$refs.kalixDialog.open(params.title)
      }
    },
    components: {
      KalixTableButtons,
      KalixTable,
      KalixPager,
      KalixTableColumns,
      KalixDialogForm: KalixScheduleDitDialogForm
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>
  @import "../../../assets/Scss/Color";

  .schedule-dict {
    .dialog-form {
      text-align: left;
    }
  }
</style>

