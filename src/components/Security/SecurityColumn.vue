<template>
  <div>
    <el-table-column label="操作" width="100">
      <template scope="scope">
        <kalix-security-button ref="btnView" v-show="btnView" type="text" size="small"
                               :permission="'admin:permissionModule:userMenu:view'"
                               :title="'查看'"></kalix-security-button>
        <kalix-security-button v-show="btnEdit" type="text" size="small"
                               :permission="'admin:permissionModule:userMenu:edit'"
                               :title="'编辑'"></kalix-security-button>
        <kalix-security-button v-show="btnDelete" type="text" size="small"
                               :permission="'admin:permissionModule:userMenu:delete'"
                               :title="'删除'"></kalix-security-button>
      </template>
    </el-table-column>
  </div>
</template>
<script type="text/ecmascript-6">
  import SecurityButton from 'components/Security/SecurityButtion'
  export default {
    props: {
      btnOption: {
        type: Array,
        default: () => {
          return ['btnView', 'btnEdit', 'btnDelete']
        }
      },
      moduleName: {
        type: String,
        required: true
      }
    },
    mounted() {
      console.log(this.$refs.btnView)
      this.$refs.btnView.show()
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
    components: {
      kalixSecurityButton: SecurityButton
    }
  }
</script>
<style>
</style>
