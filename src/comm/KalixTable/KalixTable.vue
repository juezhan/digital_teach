<template>
  <el-table class="kalix-table" slot="container"
            :data="dataList" border style="width: 100%"
            :row-class-name="tableRowClassName"
            :height="height" ref="kalixTable">
    <slot v-if="dataList && dataList.length" name="tableColumn"></slot>
    <el-table-column label="操作" width="150">
      <template scope="scope">
        <el-button v-if="btnView" @click="tableView(scope.row)" type="text" size="small">查看</el-button>
        <el-button v-if="btnEdit" @click="tableEdit(scope.row)" type="text" size="small">编辑</el-button>
        <el-button v-if="btnDelete" @click="tableDelete(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script type="text/ecmascript-6">
  import {getDC} from 'api/base'
  import axiosRequest from 'axiosjs/axios-request'
  import {PageConfig} from 'api/config'
  import Message from 'js/message'

  const CLICK_TABLE_VIEW = 'tableView'
  const CLICK_TABLE_EDIT = 'tableEdit'
  const CLICK_TABLE_DELETE = 'tableDelete'

  export default {
    props: {
      targetUrl: {
        type: String,
        default: '',
        requred: true
      },
      requestData: {
        type: Object,
        default: () => {
          return {}
        }
      },
      dataDeleteUrl: {
        type: String,
        default: function () {
          return null
        }
      },
      currentPage: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: function () {
          PageConfig.limit
        }
      },
      btnOption: {
        type: Array,
        default: () => {
          return ['btnView', 'btnEdit', 'btnDelete']
        }
      },
      isScroll: {
        type: Boolean,
        default: false
      },
      height: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dataList: []
      }
    },
    computed: {
      btnEdit () {
        return this.btnOption.indexOf('btnEdit') > -1
      },
      btnDelete () {
        return this.btnOption.indexOf('btnDelete') > -1
      },
      btnView () {
        return this.btnOption.indexOf('btnView') > -1
      },
      rowNo () {
        // 返回当前行号
        return (1 + ((this.currentPage - 1) * this.limit))
      },
      getDataDeleteUrl() {
        return this.dataDeleteUrl || this.targetUrl
      }
    },
    mounted() {
      this.getDataList()
      this.setTableHeight()
    },
    watch: {
      currentPage(val) {
        console.log('currentPage:' + val)
        this.refresh()
      }
    },
    methods: {
      getDataList() {
        let that = this
        let _data = {
          _dc: getDC(),
          page: that.currentPage,
          start: PageConfig.start,
          limit: that.limit
        }
        // 合并参数
        _data = Object.assign(_data, this.requestData)
        axiosRequest.get({
          params: _data,
          url: this.targetUrl
        }).then(response => {
          if (response.data) {
            that.dataList = response.data.data.map((item, index) => {
              item.rowNumber = index + that.rowNo
              return item
            })
            console.log(response.data.totalCount)
            that.$emit('getTotalCount', response.data.totalCount)
          }
        })
      },
      refresh() {
        let that = this
        setTimeout(() => {
          that.getDataList()
        }, 20)
      },
      tableRowClassName(row, index) {
        // 设置行样式
        return this.$parent.rowClassName && this.$parent.rowClassName(row, index)
      },
      setTableHeight() {
        if (!this.isScroll) {
          return
        }
        setTimeout(() => {
          let tbWrapper = document.getElementsByClassName('el-table__body-wrapper')
          tbWrapper[0].style.overflowX = 'hidden'
        }, 20)
      },
      tableView(row) {
        console.log('row')
        if (this._events[CLICK_TABLE_VIEW]) {
          this.$emit(CLICK_TABLE_VIEW, row)
        }
      },
      tableEdit(row) {
        if (this._events[CLICK_TABLE_EDIT]) {
          this.$emit(CLICK_TABLE_EDIT, row)
        }
      },
      tableDelete(row) {
        if (this._events[CLICK_TABLE_DELETE]) {
          this.$emit(CLICK_TABLE_DELETE, row)
        } else {
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axiosRequest.delete({
              url: this.getDataDeleteUrl + '/' + row.id,
              params: {_dc: getDC()},
              data: {
                id: row.id
              }
            }).then(response => {
              this.refresh()
              Message.success(response.data.msg)
            }).catch(() => {
            })
          }).catch(() => {
          })
        }
      }
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>
  .kalix-table {
  }
</style>
