<!--camel/rest/system/applications/modules/children/buttons/admin:permissionModule:userMenu:add?_dc=1501032193698-->
<template>
  <div>
    <el-button v-if="isShow" type="text" size="large">{{title}}</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
  import axiosRequest from '../../axios/axios-request'
  import { SecurityUrl } from '../../api/config'
  export default {
    data() {
      return {
        isShow: ''
      }
    },
    props: {
      permission: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    mounted () {
      this.getDataList()
    },
    methods: {
      show() {
        alert(this.permission)
      },
      getDataList() {
        axiosRequest.get({
          url: SecurityUrl + this.permission
        }).then(response => {
          response.data.buttons.map((item) => {
            if (item.permission === this.permission) {
              this.isShow = item.status
              console.log(item.permission + ' can be set to ' + item.status)
            }
          })
        })
      }
    }
  }
</script>
<style>
</style>
