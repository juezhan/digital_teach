<template>
  <div>
    <kalix-security-button :permission="'admin:permissionModule:userMenu:add'" :title="'新增'"></kalix-security-button>
    <kalix-table :targetUrl="roleUrl" :colData="roleColData">
      <kalix-role-column slot="column"></kalix-role-column>
      <kalix-security-column slot="toolColumn" :moduleName="moduleName">
        <!--<div slot="securityButtion">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </div>-->
      </kalix-security-column>
    </kalix-table>

  </div>
</template>
<script>
  import SecurityButton from 'components/Security/SecurityButtion'
  import SecurityColumn from 'components/Security/SecurityColumn'
  import mytable from './MyTable'
  import RoleColumn from './RoleColumn'
  import { RoleListUrl } from '../../../api/config'
  export default ({
    data() {
      return {
        roleUrl: RoleListUrl,
        moduleName: 'admin:permissionModule:userMenu',
        roleColData: [
          {prop: 'id', label: '所属应用'},
          {prop: 'app', label: '所属应用'},
          {prop: 'name', label: '角色名称'},
          {prop: 'remark', label: '备注'},
          {prop: 'createBy', label: '创建人'},
          {prop: 'creationDate', label: '创建时间'}
        ],
        btnOption: ['btnEdit', 'btnDelete']
      }
    },
    components: {
      kalixTable: mytable,
      kalixRoleColumn: RoleColumn,
      kalixSecurityButton: SecurityButton,
      kalixSecurityColumn: SecurityColumn
    }

  })
</script>
