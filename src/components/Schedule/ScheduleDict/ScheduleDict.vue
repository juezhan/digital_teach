<!--
描述：计划任务 - 系统管理 - 字典管理
开发人：桑杨
开发日期：2017年7月17日
-->
<template>
  <div class="schedule-dict">
    <search ref='mySearch' :title='searchTitle'>
      <el-form ref="form" :rules="rules" :model="form" :inline="true" class="search-container">
        <el-form-item label="类型" prop="type">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getValue"><i class="iconfont icon-query"></i>查询</el-button>
          <el-button type="success" @click="resetForm"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </search>
    <div class="wrapper">
      <div class="hd">字典列表</div>
      <div class="bd">
        <div class="toolbar">
          <el-button @click="openDialogForm"><i class="iconfont icon-add"></i>添加</el-button>
        </div>
        <div ref="wrapperContainer" class="container">
          <el-table border :data="scheduleDicts" :height="tebleHegiht">
            <el-table-column type="index" label="行号" width="80"></el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="label" label="签名" width="180"></el-table-column>
            <el-table-column prop="value" label="数值" width="70"></el-table-column>
            <el-table-column prop="createBy" label="创建人" width="120"></el-table-column>
            <el-table-column prop="creationDate" label="创建日期"></el-table-column>
            <el-table-column label="操作" width="150">
              <template scope="scope">
                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination v-if="totalCount"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="_pageSizes"
                         :page-size="1"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="添加" :visible.sync="dialogFormVisible" class="dialog-form">
      <el-form :model="dialogForm" :rules="dialogFormRules" ref="dialogForm" :label-width="'80px'">
        <el-form-item label="类型" prop="type">
          <el-select v-model="dialogForm.type">
            <el-option v-for="item in dialogFormTypes" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签名" prop="label">
          <el-input v-model="dialogForm.label" placeholder="请输入标签名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="dialogForm.description"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormCancel">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style scoped lang='scss' type='text/scss'>
  @import "../../../assets/Scss/Color";

  .schedule-dict {
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
      }
    }
    .dialog-form {
      text-align: left;
    }
  }
</style>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  //  import axios from 'axios'
  import {accessToken, getDC} from '../../../api/base'
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
        searchTitle: '字典查询',
        form: {
          type: ''
        },
        rules: {
          type: [
            {validator: validateType, trigger: 'blur'}
          ]
        },
        scheduleDicts: [],
        tebleHegiht: 0,
        tebleWidth: 0,
        totalCount: 0,
        _pageSizes: [],
        currentPage: 1,
        _limit: 0,
        _start: 0,
        dialogFormVisible: false,
        dialogFormTypes: [],
        dialogForm: {
          type: '',
          label: '',
          description: ''
        },
        dialogFormRules: {
          type: [
            {required: true, message: '请选择类型', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '请输入标签名', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this._getScheduleDictsList()
      this._initWrapperContainerHeight()
    },
    methods: {
      _getScheduleDictsList(isFlag) {
        console.log('accessToken:' + accessToken)
        // 初始化 table 数据
        let that = this
        //  检查是否是第一次执行
        if (!isFlag) {
          //  初始化分页控件
          that._limit = PageConfig.sizes[0]
          that._pageSizes = PageConfig.sizes
          that.currentPage = PageConfig.page
          that._start = PageConfig.start
        }
        let _data = {
          _dc: getDC(),
          page: that.currentPage,
          start: that._start,
          limit: that._limit
        }
        if (that.form.type.length > 0) {
          _data = Object.assign({}, _data, {jsonStr: '{"%type%": "' + strToUnicode(that.form.type) + '"}'})
        }
        Vue.axios.get(ScheduleDicts, {
          headers: {access_token: accessToken},
          params: _data
        }).then(response => {
          that.scheduleDicts = response.data.data
          that.totalCount = response.data.totalCount
        })
      },
      _initWrapperContainerHeight() {
        //  计算 table 容器高度
        this.tebleHegiht = this.$refs.wrapperContainer.scrollHeight
        // 清理 table 横向滚动条
        let tbWrapper = document.getElementsByClassName('el-table__body-wrapper')
        tbWrapper[0].style.overflowX = 'hidden'
      },
      handleSizeChange(val) {
        //  改变每页记录数
        let that = this
        that._limit = val
        that._getScheduleDictsList(true)
      },
      handleCurrentChange(val) {
        //  翻页
        let that = this
        that.currentPage = val
        that._getScheduleDictsList(true)
      },
      getValue() {
        if (this.form.type.length > 0) {
          this._getScheduleDictsList(true)
        }
      },
      resetForm() {
        this.$refs.form.resetFields()
      },
      openDialogForm() {
//          打开对话框
        let that = this
        that.dialogFormVisible = true
        let _data = {
          _dc: getDC(),
          query: '',
          page: 1,
          start: 0,
          limit: 25
        }
        Vue.axios.get(ScheduleDictsTypesList, {
          headers: {access_token: accessToken},
          params: _data
        }).then(response => {
          that.dialogFormTypes = response.data
        })
      },
      dialogFormSubmit() {
//         提交对话框
        let that = this
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            let _data = {
              id: 0,
              description: that.dialogForm.description,
              label: that.dialogForm.label,
              type: that.dialogForm.type
            }
            Vue.axios({
              url: ScheduleDicts,
              method: 'POST',
              headers: {access_token: accessToken},
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
                that.dialogFormVisible = false
                // 刷新列表
                that._getScheduleDictsList(false)
                that.$refs.dialogForm.resetFields()
                that.dialogForm.description = ''
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
        this.dialogFormVisible = false
      }
    }
  }
</script>

