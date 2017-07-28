<template>
    <div>
      <el-table-column label="行号" width="70">
        <template scope="scope">
          <div style="text-align: center">{{scope.row.rowNumber}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
      <el-table-column prop="label" label="签名" width="180"></el-table-column>
      <el-table-column prop="value" label="数值" width="70"></el-table-column>
      <el-table-column prop="createBy" label="创建人" width="120"></el-table-column>
      <el-table-column prop="creationDate" label="创建日期"></el-table-column>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style scoped lang='scss' type='text/scss'>
</style>
