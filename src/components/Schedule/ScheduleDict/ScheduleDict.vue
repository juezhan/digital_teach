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
             :dataUrl="dataUrl"
             :dataSearchObj="search.obj"
             :requestData="requestData"
             @tableView="tableView"
             @tableEdit="tableEdit"
             @tableDelete="tableDelete"
    >
      <!-- 按钮 -->
      <div slot="toolbar">
        <el-button @click="addData" type="primary"><i class="iconfont icon-add"></i>添加</el-button>
      </div>
      <!-- 列表 -->
      <template slot="container">
        <el-table-column label="行号" width="70">
          <template scope="scope">
            <div style="text-align: center">{{ scope.row.rowNumber}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="180"></el-table-column>
        <el-table-column prop="label" label="签名" width="180"></el-table-column>
        <el-table-column prop="value" label="数值" width="70"></el-table-column>
        <el-table-column prop="createBy" label="创建人" width="120"></el-table-column>
        <el-table-column prop="creationDate" label="创建日期"></el-table-column>
      </template>
    </wrapper>
    <!-- 对话框 -->
    <kalix-dialog ref="kalixDialog">
      <el-form :model="dialog.form" :rules="dialog.rules" ref="dialogForm" :label-width="'80px'">
        <el-form-item v-if="dialog.isDetail" label="类型" prop="type">
          <el-input v-model="dialog.form.type" :readonly="dialog.isDetail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-else label="类型" prop="type">
          <el-select v-model="dialog.form.type">
            <el-option v-for="item in dialog.form.types" :key="item.name" :label="item.name"
                       :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签名" prop="label">
          <input type="hidden" v-model="dialog.form.id"/>
          <el-input v-model="dialog.form.label" placeholder="请输入标签名" :readonly="dialog.isDetail"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="dialog.form.description" :readonly="dialog.isDetail"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <template v-if="dialog.isDetail">
          <el-button type="primary" @click="dialogFormCancel">关 闭</el-button>
        </template>
        <template v-else>
          <el-button @click="dialogFormCancel">取 消</el-button>
          <el-button type="primary" @click="dialogFormSubmit">提 交</el-button>
        </template>
      </div>
    </kalix-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import {getDC} from 'api/base'
  import {ScheduleDicts, ScheduleDictsTypesList, PageConfig} from 'api/config'
  //  import {ScheduleDicts, PageConfig, ScheduleDictsTypesList} from 'api/config'
  import {strToUnicode} from 'unit/unicode-convert'
  import axiosRequest from 'axiosjs/axios-request'
  import Message from 'js/message'
  //  import MyTableMethods from 'js/MyTableMethods'
  import KalixTableButtons from 'comm/Wrapper/KalixTableButtons.vue'
  import KalixTable from 'comm/KalixTable/KalixTable'
  import KalixPager from 'comm/KalixPager/KalixPager'

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
      this.roleColData = [
        {prop: 'type', label: '类型', width: 180},
        {prop: 'label', label: '签名', width: 180},
        {prop: 'value', label: '数值', width: 70},
        {prop: 'createBy', label: '创建人', width: 120},
        {prop: 'creationDate', label: '创建日期'}
      ]
      this.btnOption = ['btnEdit', 'btnDelete', 'btnView']
      this.defaultDialogForm = JSON.parse(JSON.stringify(this.$data.dialog.form))
      this.requestData = {}
    },
    mounted() {
    },
    methods: {
      searchFormSubmit() {
        // 查询
        let that = this
        if (that.search.form.type.length > 0) {
          that.search.obj = {jsonStr: '{"%type%": "' + strToUnicode(that.search.form.type) + '"}'}
          that.$refs.myWrapper.getDataList(true)
        }
      },
      resetSearchForm() {
        // 重置搜索框
        this.search.obj = {}
        this.$refs.searchForm.resetFields()
        this.$refs.myWrapper.getDataList(true)
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
          this.$refs.kalixTable.refresh()
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
      KalixPager
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

