<template>
  <el-pagination slot="pagination" v-if="totalCount"
                 @size-change="pagerSizeChange"
                 @current-change="pagerCurrentChange"
                 :current-page="currentPage"
                 :page-sizes="pageSizes"
                 :page-size="1"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="totalCount">
  </el-pagination>
</template>

<script type="text/ecmascript-6">
  import {PageConfig} from 'api/config'

  export default {
    props: {
      totalCount: {
        type: Number,
        default: 0
      },
      currentPage: {
        type: Number,
        default: 1
      },
      pageSizes: {
        default: function () {
          return PageConfig.sizes
        }
      },
      limit: {
        default: () => {
          PageConfig.sizes[0]
        }
      },
      start: {
        default: 0
      }
    },
    mounted() {
    },
    methods: {
      pagerSizeChange(val) {
        this.$emit('pagerSizeChange', val)
      },
      pagerCurrentChange(val) {
        this.$emit('pagerCurrentChange', val)
      }
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>
</style>
