<!--
描述：主窗口
开发人：桑杨
开发日期：2017年7月17日
-->
<template>
  <div class="home">
    <tool-bar :menuChk="isSmail" @setSmail="setSmail"></tool-bar>
    <div class="s-flex container">
      <tree-list :menuChk="isSmail"></tree-list>
      <div class="s-flex_item article">
        <component v-bind:is="which_to_show"></component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" type="text/scss">
  .home {
    .container {
      position: absolute;
      top: 65px;
      left: 0;
      bottom: 0;
      width: 100%;
      .article {
        overflow: auto;
        position: relative;
      }
    }
  }
</style>

<script>
  import TreeList from '../TreeList/TreeList.vue'
  import ToolBar from '../ToolBar/ToolBar.vue'

  import Welcome from '../Welcome/Welcome.vue'
  import User from '../Admin/User/User.vue'
  import Role from '../Admin/Role/Role.vue'
  import ScheduleDict from '../Schedule/ScheduleDict/ScheduleDict.vue'
  //  import data from '../../../util/mock'

  let _components = {
    ToolBar,
    TreeList,
    Welcome,
    User,
    Role,
    ScheduleDict
  }

  export default{
    data() {
      return {
        name: 'Compomnents Name',
        isSmail: false,
        which_to_show: 'Welcome'
      }
    },
    mounted() {
      this.fetchdata()
    },
    watch: {'$route': 'fetchdata'},
    methods: {
      setSmail(e) {
        this.isSmail = e
      },
      fetchdata() {
        let app = this.$route.params.app
        this.which_to_show = (_components[app]) ? app : 'Welcome'

//        mock 跨域
//        Vue.axios.get('http://localhost:3003/news').then((response) => {
//          console.log(response);
//        });

//        Vue.axios.get('http://test.cn/list').then((response) => {
//          console.log(response.data.data);
//        });
      }
    },
    components: _components
  }
</script>
