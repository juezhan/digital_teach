<!--
描述：系统应用-权限管理-用户管理
开发人：桑杨
开发日期：2017年7月17日
-->
<template>
  <!--用户管理-->
  <div class='User'>
    <search ref='mySearch' :title="'用户查询'">
      <el-form ref="searchForm" :inline="true" class="search-container" :model="search.form">
        <el-form-item label="登录名">
          <el-input v-model="search.form.loginName"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="search.form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchFormSubmit"><i class="iconfont icon-query"></i>查询</el-button>
          <el-button type="primary" @click="resetSearchForm"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </search>
    <wrapper ref='myWrapper' :title="'用户列表'" :icon="'iconfont icon-user-management'" :dataUrl="dataUrl"
             :dataSearchObj="search.obj">
      <div slot="toolbar">
        <el-button type="primary"><i class="iconfont icon-add"></i>添加</el-button>
      </div>
      <template slot="container">
        <el-table-column type="index" label="行号" width="50">
        </el-table-column>
        <el-table-column label="头像" width="80">
          <template scope="scope">
            <img src="http://localhost:8181/resources/images/default_user.png">
          </template>
        </el-table-column>
        <el-table-column prop="id" label="工号"></el-table-column>
        <el-table-column prop="loginName" label="登录名"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="id" label="岗位名称"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="creationDate" label="创建日期"></el-table-column>
        <el-table-column prop="org" label="机构"></el-table-column>
        <el-table-column prop="duty" label="职务"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="workGroup" label="工作组"></el-table-column>
        <el-table-column label="状态">
          <template scope="scope">
            <div>{{scope.row.available?'启用':'停用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
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
            <el-option v-for="item in dialog.form.types" :label="item.name" :value="item.name"
                       :key="item.id"></el-option>
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

<script>
  /* eslint-disable no-unused-vars */
  import Vue from 'vue'
  import Chart from 'chart.js'
  import {dc, getDC} from 'api/base'
  import {UserListUrl, PageConfig} from 'api/config'
  import {strToUnicode} from 'unit/unicode-convert'
  export default{
    data() {
      return {
        dataUrl: UserListUrl,
        search: {
          obj: {},
          form: {
            loginName: '',
            name: ''
          }
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
    },
    methods: {
      _initUserList(isFlag) {
        let that = this
        if (!isFlag) {
          //  初始化分页控件
          that.pager.limit = PageConfig.sizes[0]
          that.pager.pageSizes = PageConfig.sizes
          that.pager.currentPage = PageConfig.page
          that.pager.start = PageConfig.start
        }
        let _data = {
          _dc: getDC(),
          jsonStr: '',
          loginName: that.search.form.loginName,
          name: that.search.form.name,
          page: that.pager.currentPage,
          start: that.pager.start,
          limit: that.pager.limit
        }
        Vue.axios.get(UserListUrl, {
          params: _data
        }).then(response => {
          this.userList = response.data.data
          that.pager.totalCount = response.data.totalCount
        })
      },
      _initWrapperContainerHeight() {
        //  计算 table 容器高度
        this.tebleHegiht = this.$refs.myWrapper.getContainerHeight()
        // 清理 table 横向滚动条
        let tbWrapper = document.getElementsByClassName('el-table__body-wrapper')
        tbWrapper[0].style.overflowX = 'hidden'
      },
      searchFormSubmit() {
        // 查询
        let that = this
        that.$refs.searchForm.validate((valid) => {
          if (!valid) {
            return false
          }
          that.search.obj = {
            jsonStr: '{"%loginName%": "' + strToUnicode(that.search.form.loginName) + '", "%name%": "' + strToUnicode(that.search.form.name) + '"}'
          }
          that.$refs.myWrapper.getDataList(true)
        })
      },
      resetSearchForm() {
        // 重置搜索框
        this.search.obj = {}
        this.$refs.searchForm.resetFields()
        this.$refs.myWrapper.getDataList(true)
      },
      rowClassName(row, index) {
        if (row.available === 0) {
          return 'info-row'
        }
        return ''
      },
      dialogFormCancel() {
      },
      dialogFormSubmit() {
      }
    },
    components: {},
    computed: {}
  }
</script>

<style scoped lang='scss' type='text/scss'>
  .User {
    text-align: left;
  }
</style>
