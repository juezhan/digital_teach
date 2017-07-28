<template>
  <div class="wrapper">
    <div class="hd"><i v-if="icon.length" :class="icon"></i>{{title}}</div>
    <div class="bd">
      <div class="toolbar">
        <slot name="toolbar"></slot>
      </div>
      <div class="container" ref="wrapperContainer">
        <kalix-table ref="kalixTable"
                     :target-url="dataUrl"
                     :btn-option="btnOption"
                     :is-scroll="tableIsScroll"
                     :request-data="requestData"
                     :current-page="pager.currentPage"
                     :limit="pager.limit"
                     :height="tableHegiht"
                     @getTotalCount="setTotalCount"
        >
          <template slot="tableColumn">
            <slot name="container"></slot>
          </template>
        </kalix-table>
      </div>
      <div class="pagination">
        <kalix-pager slot="pagination" :currentPage="pager.currentPage" :totalCount="pager.totalCount"
                     :limit="pager.limit"
                     @pagerCurrentChange="pagerCurrentChange"
                     @pagerSizeChange="pagerSizeChange"
        ></kalix-pager>
      </div>
    </div>
  </div>
</template>

<script>
  import {PageConfig} from 'api/config'
  import KalixTable from 'comm/KalixTable/KalixTable'
  import KalixPager from 'comm/KalixPager/KalixPager'

  export default{
    props: {
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      dataUrl: {
        type: String,
        default: ''
      },
      requestData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        tableHegiht: 0,
        // 数据列表
        dataList: [],
        // 分页器
        pager: {
          totalCount: 0,
          pageSizes: [],
          currentPage: 1,
          limit: PageConfig.sizes[0],
          start: 0
        }
      }
    },
    created() {
      this.btnOption = ['btnEdit', 'btnDelete', 'btnView']
      this.tableIsScroll = true
    },
    mounted() {
      this.setTableHeight()
    },
    methods: {
      refresh() {
        this.$refs.kalixTable.refresh()
      },
      setTableHeight() {
        this.tableHegiht = this.$refs.wrapperContainer.scrollHeight
      },
      pagerSizeChange(val) {
        //  改变每页记录数
        this.pager.limit = val
        this.pager.currentPage = 1
      },
      pagerCurrentChange(val) {
        //  翻页
        this.pager.currentPage = val
      },
      tableRowClassName(row, index) {
        // 设置行样式
        return this.$parent.rowClassName && this.$parent.rowClassName(row, index)
      },
      tableView(row) {
        this.$emit('tableView', row)
      },
      tableEdit(row) {
        this.$emit('tableEdit', row)
      },
      tableDelete(row) {
        this.$emit('tableDelete', row)
      },
      setTotalCount(totalCount) {
        this.pager.totalCount = totalCount
      }
    },
    components: {
      KalixTable,
      KalixPager
    },
    computed: {
      rowNo () {
        // 返回当前行号
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit))
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import "../../assets/Scss/Color";

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
        overflow: hidden;
        bottom: 48px;
        right: 0;
        left: 0;
        top: 104px;
        text-align: left;
        .el-table .info-row {
          background-color: $bc-att;
        }
      }
      .pagination {
        text-align: left;
        padding: 8px 0;
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>
