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
    <wrapper ref='myWrapper' :title="'字典列表'" :icon="'iconfont icon-dict-management'">
      <div class="toolbar">
        <el-button @click="openDialogForm"><i class="iconfont icon-add"></i>添加</el-button>
      </div>
      <div ref="wrapperContainer" class="container">
        <el-table border :data="scheduleDicts" :height="tebleHegiht">
          <el-table-column label="行号" width="70">
            <template scope="scope">
              <div style="text-align: center">{{ scope.$index+rowNo}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="180"></el-table-column>
          <el-table-column prop="label" label="签名" width="180"></el-table-column>
          <el-table-column prop="value" label="数值" width="70"></el-table-column>
          <el-table-column prop="createBy" label="创建人" width="120"></el-table-column>
          <el-table-column prop="creationDate" label="创建日期"></el-table-column>
          <el-table-column label="操作" width="150">
            <template scope="scope">
              <el-button type="text" size="small" @click="taberDetail(scope.$index, scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="taberEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="taberDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination v-if="pager.totalCount"
                       @size-change="pagerSizeChange"
                       @current-change="pagerCurrentChange"
                       :current-page="pager.currentPage"
                       :page-sizes="pager.pageSizes"
                       :page-size="1"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pager.totalCount">
        </el-pagination>
      </div>
    </wrapper>

    <!-- 对话框 -->
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" class="dialog-form">
      <input type="hidden" v-model="dialog.form.id"/>
      <el-form :model="dialog.form" :rules="dialog.rules" ref="dialogForm" :label-width="'80px'">
        <el-form-item v-if="dialog.isDetail" label="类型" prop="type">
          <el-input v-model="dialog.form.type" :readonly="dialog.isDetail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-else label="类型" prop="type">
          <el-select v-model="dialog.form.type">
            <el-option v-for="item in dialog.types" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签名" prop="label">
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
      <div slot="footer" class="dialog-footer">
        <template v-if="dialog.isDetail">
          <el-button type="primary" @click="dialogFormCancel">关 闭</el-button>
        </template>
        <template v-else="">
          <el-button @click="dialogFormCancel">取 消</el-button>
          <el-button type="primary" @click="dialogFormSubmit">提 交</el-button>
        </template>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {getDC, getAccessToken} from '../../../api/base'
  import {ScheduleDicts, PageConfig, ScheduleDictsTypesList} from '../../../api/config'
  import {strToUnicode} from '../../../unit/unicode-convert'

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
        // 搜索框
        search: {
          title: '字典查询',
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
        // 表格搞定
        tebleHegiht: 0,
        // 分页器
        pager: {
          totalCount: 0,
          pageSizes: [],
          currentPage: 1,
          limit: 0,
          start: 0
        },
        // 对话框
        dialog: {
          title: '',
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
    mounted() {
      // 初始化数据列表
      this._getScheduleDictsList()
      // 初始化表格
      this._initWrapperContainerHeight()
    },
    methods: {
      _getScheduleDictsList(isFlag) {
        // 初始化 table 数据
        let that = this
        //  检查是否是第一次执行
        if (!isFlag) {
          //  初始化分页控件
          that.pager.limit = PageConfig.sizes[0]
          that.pager.pageSizes = PageConfig.sizes
          that.pager.currentPage = PageConfig.page
          that.pager.start = PageConfig.start
        }
        let _data = {
          _dc: getDC(),
          page: that.pager.currentPage,
          start: that.pager.start,
          limit: that.pager.limit
        }
        if (that.search.form.type.length > 0) {
          _data = Object.assign({}, _data, {jsonStr: '{"%type%": "' + strToUnicode(that.search.form.type) + '"}'})
        }
        Vue.axios.get(ScheduleDicts, {
          headers: {access_token: getAccessToken()},
          params: _data
        }).then(response => {
          that.scheduleDicts = response.data.data
          that.pager.totalCount = response.data.totalCount
        })
      },
      _initWrapperContainerHeight() {
        //  计算 table 容器高度
        this.tebleHegiht = this.$refs.wrapperContainer.scrollHeight
        // 清理 table 横向滚动条
        let tbWrapper = document.getElementsByClassName('el-table__body-wrapper')
        tbWrapper[0].style.overflowX = 'hidden'
      },
      pagerSizeChange(val) {
        //  改变每页记录数
        let that = this
        that.pager.limit = val
        that._getScheduleDictsList(true)
      },
      pagerCurrentChange(val) {
        //  翻页
        let that = this
        that.currentPage = val
        that._getScheduleDictsList(true)
      },
      searchFormSubmit() {
        // 查询
        if (this.form.type.length > 0) {
          this._getScheduleDictsList(true)
        }
      },
      resetSearchForm() {
        // 重置搜索框
        this.$refs.searchForm.resetFields()
      },
      openDialogForm() {
        // 打开对话框
        let that = this
        that.dialog.visible = true
        that.dialog.title = '添加'
        let _data = {
          _dc: getDC(),
          query: '',
          page: 1,
          start: 0,
          limit: 25
        }
        Vue.axios.get(ScheduleDictsTypesList, {
          headers: {access_token: getAccessToken()},
          params: _data
        }).then(response => {
          that.dialog.types = response.data
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
            Vue.axios({
              url: ScheduleDicts,
              method: 'POST',
              headers: {access_token: getAccessToken()},
              params: {_dc: getDC()},
              data: _data
            }).then(response => {
              if (response.data.success) {
                this.$message({
                  showClose: true,
                  message: response.data.msg,
                  type: 'success'
                })
                // 关闭对话框
                that.dialog.visible = false
                // 刷新列表
                that._getScheduleDictsList(false)
                that.$refs.dialogForm.resetFields()
                that.dialog.form.description = ''
              } else {
                this.$message({
                  showClose: true,
                  message: response.data.msg,
                  type: 'error'
                })
              }
            })
          } else {
            return false
          }
        })
      },
      dialogFormCancel() {
        // 关闭对话框
        this.dialog.visible = false
      },
      taberDetail(index, row) {
        this.dialog.isDetail = true
        this.dialog.title = '查看'
        this._showDetail(index, row)
      },
      taberEdit(index, row) {
        this.dialog.isDetail = false
        this.dialog.title = '修改'
        this._showDetail(index, row)
      },
      taberDelete(index, row) {
        //  删除记录
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Vue.axios({
            url: ScheduleDicts + '/' + row.id,
            method: 'DELETE',
            headers: {access_token: getAccessToken()},
            params: {_dc: getDC()},
            data: {
              id: row.id
            }
          }).then(response => {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
            this._getScheduleDictsList(false)
          })
        }).catch(() => {
        })
      },
      _showDetail(index, row) {
        let that = this
        that.dialog.form.id = row.id
        that.dialog.form.description = row.description
        that.dialog.form.label = row.label
        that.dialog.form.type = row.type
        that.dialog.visible = true
      }
    },
    computed: {
      rowNo: function () {
        // 返回当前行号
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit))
      }
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>
  @import "../../../assets/Scss/Color";

  .schedule-dict {
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
    .dialog-form {
      text-align: left;
    }
  }
</style>

