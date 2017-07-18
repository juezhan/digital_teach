<!--
描述：计划任务 - 系统管理 - 字典管理
开发人：桑杨
开发日期：2017年7月17日
-->
<template>
  <div class="schedule-dict">
    <search ref='mySearch' :title='searchTitle'>
      <el-form ref="form" :inline="true" class="search-container">
        <el-form-item label="类型">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getValue"><i class="iconfont icon-query"></i>查询</el-button>
          <el-button type="success"><i class="iconfont icon-reset"></i>重置</el-button>
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
  import {ScheduleDicts, PageConfig} from '../../../api/config'
  import {strToUnicode} from '../../../unit/unicode-convert'

  export default {
    data() {
      return {
        searchTitle: '字典查询',
        form: {
          type: ''
        },
        scheduleDicts: [],
        tebleHegiht: 0,
        tebleWidth: 0,
        totalCount: 0,
        _pageSizes: [],
        currentPage: 1,
        _limit: 0,
        _start: 0
      }
    },
    mounted() {
      this._getScheduleDictsList()
      this._initWrapperContainerHeight()
    },
    methods: {
      _getScheduleDictsList(isFlag) {
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
          let str = (strToUnicode(that.form.type))
          _data = Object.assign({}, _data, {jsonStr: {'type': str}})
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
        this._getScheduleDictsList(true)
      }
    }
  }
</script>

