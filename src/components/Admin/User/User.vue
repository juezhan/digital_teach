<!--
描述：系统应用-权限管理-用户管理
开发人：桑杨
开发日期：2017年7月17日
-->
<template>
  <!--用户管理-->
  <div class='User'>
    <search ref='mySearch' :title='searchTitle'>
      <el-form ref="searchForm" :inline="true" class="search-container" :model="search.form">
        <el-form-item label="登录名">
          <el-input v-model="search.form.loginName"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="search.form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"><i class="iconfont icon-query"></i>查询</el-button>
          <el-button type="primary"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </search>
    <wrapper ref='myWrapper' :title="'用户列表'" :icon="'iconfont icon-user-management'">
      <div slot="toolbar">
        <el-button type="primary"><i class="iconfont icon-add"></i>添加</el-button>
      </div>
      <el-table slot="container" :data="userList" border style="width: 100%" :height="tebleHegiht">
        <el-table-column type="index" label="行号" width="50"></el-table-column>
        <el-table-column prop="id" label="头像"></el-table-column>
        <el-table-column prop="id" label="工号"></el-table-column>
        <el-table-column prop="loginName" label="登录名"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="id" label="岗位名称"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="creationDate" label="创建日期"></el-table-column>
        <el-table-column prop="org" label="机构"></el-table-column>
        <el-table-column prop="date" label="职务"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="workGroup" label="工作组"></el-table-column>
        <el-table-column prop="id" label="状态"></el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination slot="pagination" v-if="pager.totalCount"
                     @size-change="pagerSizeChange"
                     @current-change="pagerCurrentChange"
                     :current-page="pager.currentPage"
                     :page-sizes="pager.pageSizes"
                     :page-size="1"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pager.totalCount">
      </el-pagination>
    </wrapper>
    <!-- 分页器 -->

  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import Vue from 'vue'
  import Chart from 'chart.js'
  import {dc, getDC} from '../../../api/base'
  import {UserListUrl, PageConfig} from '../../../api/config'
  export default{
    data() {
      return {
        searchTitle: '用户查询',
        search: {
          form: {
            loginName: '',
            name: ''
          }
        },
        // 分页器
        pager: {
          totalCount: 0,
          pageSizes: [],
          currentPage: 1,
          limit: 0,
          start: 0
        },
        userType: '-1',
        isDelivery: false,
        resource: '',
        desc: '',
        chkValues: [],
//        搜索框
        userList: [],
        currentPage4: 4,
        tebleHegiht: 0
      }
    },
    mounted() {
      this._initUserList()
      // 初始化表格
      this._initWrapperContainerHeight()
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
      pagerSizeChange(val) {
        //  改变每页记录数
        let that = this
        that.pager.limit = val
        that._initUserList(true)
      },
      pagerCurrentChange(val) {
        //  翻页
        let that = this
        that.pager.currentPage = val
        that._initUserList(true)
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
