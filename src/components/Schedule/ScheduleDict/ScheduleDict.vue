<template>
  <div class="schedule-dict">
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
    <div class="wrapper">
      <div class="hd">用户列表</div>
      <div class="bd">
        <div class="toolbar">
          <el-button><i class="iconfont icon-add"></i>添加</el-button>
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
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
      </div>
    </div>
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
  }
</style>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {accessToken, getDC} from '../../../api/base'
  import {ScheduleDicts} from '../../../api/config'
  export default {
    data() {
      return {
        searchTitle: '字典查询',
        form: {
          loginName: '',
          name: ''
        },
        currentPage4: 4,
        scheduleDicts: [],
        tebleHegiht: 0,
        tebleWidth: 0
      }
    },
    mounted() {
      this._getScheduleDictsList()
      this._initWrapperContainerHeight()
    },
    methods: {
      _getScheduleDictsList() {
        let that = this
        let _data = {
          _dc: getDC(),
          page: 1,
          start: 0,
          limit: 20
        }
        Vue.axios.get(ScheduleDicts, {
          headers: {access_token: accessToken},
          params: _data
        }).then(response => {
          that.scheduleDicts = response.data.data
        })
      },
      _initWrapperContainerHeight() {
//        window.wrapperContainer = this.$refs.wrapperContainer
        this.tebleHegiht = this.$refs.wrapperContainer.scrollHeight
        let tbWrapper = document.getElementsByClassName('el-table__body-wrapper')
        tbWrapper[0].style.overflowX = 'hidden'
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

