<template>
  <el-table-row ref="templateColumn">
    <el-table-column type="index" label="行号" width="50"></el-table-column>
    <el-table-column prop="id" label="头像"></el-table-column>
    <el-table-column prop="id" label="工号"></el-table-column>
    <el-table-column prop="loginName" label="登录名"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column label="性别">
      <template scope="scope">
        <span>{{scope.row.sex | filterSex}}</span>
      </template>
    </el-table-column>
    <el-table-column label="创建日期">
      <template scope="scope">
        <span>{{scope.row.creationDate | filterTime}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="createBy" label="创建人"></el-table-column>
  </el-table-row>
</template>
<script type="text/ecmascript-6">
  import * as filter from '../../../filters'
  export default {
    filters: {
      filterSex(sex) {
        const statusMap = {
          '男': 'success',
          '女': 'gray'
        }
        return statusMap[sex]
      },
      filterTime(value) {
        return filter.formatTime(value)
      }
    }
  }
</script>
<style>
</style>
