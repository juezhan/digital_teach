<template>
  <!--角色管理-->
  <div id="dataTable">
    <el-table slot="container" :data="dataList" border style="width: 100%">
      <!--<template scope="scope">-->
      <el-table-column v-for="(col, index) in colData" :prop="col.prop" :label="col.label" :key="col.id"/>
      <!--</template>-->

      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button v-show="btnView" type="text" size="small" @click="alertIndex(scope.row)">查看</el-button>
          <el-button v-show="btnEdit" type="text" size="small">编辑</el-button>
          <el-button v-show="btnDelete" type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
  import { PageConfig } from '../../../api/config'
  import axiosRequest from '../../../axios/axios-request'
  export default{
    data() {
      return {
        name: 'Role',
        dataList: [],
        // 分页器
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.sizes[0],
          start: 0
        }
      }
    },
    props: {
      targetUrl: {
        type: String,
        default: ''
      },
      colData: {
        type: Array,
        required: true
      },
      btnOption: {
        type: Array,
        default: () => { return ['btnView', 'btnEdit', 'btnDelete'] }
      }
    },
    mounted() {
      this.getDataList()
    },
    computed: {
      btnEdit () {
        return (this.btnOption.indexOf('btnEdit') > -1)
      },
      btnDelete () {
        return (this.btnOption.indexOf('btnDelete') > -1)
      },
      btnView () {
        return (this.btnOption.indexOf('btnView') > -1)
      }

    },
    methods: {
      alertIndex(index, row) {
        console.log(row)
      },
      getDataList() {
        let that = this
        let _data = {
          jsonStr: '',
//          loginName: that.search.form.loginName,
//          name: that.search.form.name,
          page: that.pager.currentPage,
          start: that.pager.start,
          limit: that.pager.limit
        }
        this.listLoading = true
        axiosRequest.get({
          params: _data,
          url: this.targetUrl
        }).then(response => {
//          if(response.data)
          this.dataList = response.data.data
          that.pager.totalCount = response.data.totalCount
          this.listLoading = false
        })
      },
      pagerSizeChange(val) {
        //  改变每页记录数
        this.pager.limit = val
        this.getRoleList()
      },
      pagerCurrentChange(val) {
        //  翻页
        this.pager.currentPage = val
        this.getRoleList()
      }
    },
    components: {}
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #Role {
  }
</style>
