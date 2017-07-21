<!--
描述：系统应用-权限管理-用户管理
开发人：桑杨
开发日期：2017年7月17日
-->
<template>
  <!--用户管理-->
  <div class='User'>
    <search ref='mySearch' :title='searchTitle'>
      <el-form ref="form" :inline="true" class="search-container" :model="form">
        <el-form-item label="登录名">
          <el-input v-model="form.loginName"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"><i class="iconfont icon-query"></i>查询</el-button>
          <el-button type="primary"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </search>
    <wrapper ref='myWrapper' :title="'用户列表'" :icon="'iconfont icon-user-management'">
      <div class="toolbar">
        <el-button><i class="iconfont icon-add"></i>添加</el-button>
      </div>
      <el-table :data="userList" border style="width: 100%" height="250">
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
    </wrapper>

  </div>
</template>
<style scoped lang='scss' type='text/scss'>
  .User {
    text-align: left;
  }
</style>
<script>
  /* eslint-disable no-unused-vars */
  import Vue from 'vue'
  import Chart from 'chart.js'
  import {dc, getDC, getAccessToken} from '../../../api/base'
  import {UserListUrl} from '../../../api/config'
  export default{
    data() {
      return {
        searchTitle: '用户查询',
        form: {
          loginName: '',
          name: ''
        },
        userType: '-1',
        isDelivery: false,
        type: ['地推活动', '单纯品牌曝光'],
        resource: '',
        desc: '',
        chkValues: [],
//        搜索框
        userList: [],
        currentPage4: 4
      }
    },
    mounted() {
      this._initUserList()
    },
    methods: {
      _initUserList() {
        let that = this
        let _data = {
          _dc: getDC(),
          jsonStr: '',
          loginName: that.form.loginName,
          name: that.form.name,
          page: 1,
          start: 0,
          limit: 20
        }
        Vue.axios.get(UserListUrl, {
          params: _data
        }).then(response => {
          this.userList = response.data.data
        })
      }
    },
    components: {
    },
    computed: {}
  }
</script>
