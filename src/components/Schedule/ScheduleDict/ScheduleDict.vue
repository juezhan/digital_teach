<!--
描述：计划任务 - 系统管理 - 字典管理
开发人：桑杨
开发日期：2017年7月17日
-->
<template>
  <div class="schedule-dict">
    <search ref='mySearch' title="字典查询">
      <el-form ref="searchForm" :rules="search.rules" :model="search.form" :inline="true" class="search-container">
        <el-form-item label="类型" prop="type">
          <el-input v-model="search.form.type"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchFormSubmit"><i class="iconfont icon-query"></i>查询</el-button>
          <el-button type="success" @click="resetSearchForm"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </search>
    <kalix-wrapper ref='myWrapper' title="字典列表" icon="iconfont icon-dict-management"
                   :data-url="dataUrl"
                   :request-data="requestData">
      <!-- 按钮 -->
      <div slot="toolbar">
        <el-button @click="addData" type="primary"><i class="iconfont icon-add"></i>添加</el-button>
      </div>
      <!-- 列表 -->
      <kalix-table-columns slot="container"></kalix-table-columns>
    </kalix-wrapper>
    <!-- 对话框 -->
    <kalix-dialog ref="kalixDialog"
                  :form-name="'kalixScheduleDitDialogForm'">
      <kalix-dialog-form slot="dialog-container"
                         ref="kalixScheduleDitDialogForm"
                         @dialogFormCancel="()=>{$refs.kalixDialog.close()}"
                         @refreshData="()=>{$refs.myWrapper.refresh()}"></kalix-dialog-form>
    </kalix-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ScheduleDicts} from 'api/config'
  import {strToUnicode} from 'unit/unicode-convert'
  import KalixTableButtons from 'comm/Wrapper/KalixTableButtons.vue'
  import KalixTable from 'comm/KalixTable/KalixTable'
  import KalixPager from 'comm/KalixPager/KalixPager'
  import KalixTableColumns from './ScheduleDictTableColumns.vue'
  import KalixScheduleDitDialogForm from './ScheduleDitDialogForm.vue'

  export default {
    data() {
      let validateType = (rule, value, callback) => {
        callback()
      }
      return {
        dataUrl: ScheduleDicts,
        // 请求参数
        requestData: {},
        // 搜索框
        search: {
          form: {
            type: ''
          },
          rules: {
            type: [
              {validator: validateType, trigger: 'blur'}
            ]
          }
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      searchFormSubmit() {
        // 提价查询
        let that = this
        if (that.search.form.type.length > 0) {
          that.requestData = {jsonStr: '{"%type%": "' + strToUnicode(that.search.form.type) + '"}'}
          that.$refs.myWrapper.refresh()
        }
      },
      resetSearchForm() {
        // 重置搜索框
        this.search.obj = {}
        this.$refs.searchForm.resetFields()
        this.$refs.myWrapper.refresh()
      },
      addData() {
        // 打开对话框
        this.$refs.kalixDialog.open('添加')
      }
    },
    components: {
      KalixTableButtons,
      KalixTable,
      KalixPager,
      KalixTableColumns,
      KalixDialogForm: KalixScheduleDitDialogForm
    }
  }
</script>

<style scoped lang='scss' type='text/scss'>
  @import "../../../assets/Scss/Color";

  .schedule-dict {
    .dialog-form {
      text-align: left;
    }
  }
</style>

