<template>
  <div>
    <kalix-table :targetUrl="roleUrl" :colData="roleColData">
      <kalix-role-column slot="column"></kalix-role-column>
    </kalix-table>
  </div>
</template>
<script>
  import mytable from './MyTable'
  import RoleColumn from './RoleColumn'
  import { RoleListUrl } from '../../../api/config'
  export default ({
    data() {
      return {
        roleUrl: RoleListUrl,
        roleColData: [
          {prop: 'id', label: '所属应用'},
          {prop: 'app', label: '所属应用'},
          {prop: 'name', label: '角色名称'},
          {prop: 'remark', label: '备注'},
          {prop: 'createBy', label: '创建人'},
          {prop: 'creationDate', label: '创建时间'}
        ],
        btnOption: ['btnEdit', 'btnDelete', 'btnView']
      }
    },
    components: {
      kalixTable: mytable,
      kalixRoleColumn: RoleColumn
    }

  })
</script>
