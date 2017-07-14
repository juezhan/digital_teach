<template>
  <!--角色管理-->
  <div id="Role">
    <div>级联选择器</div>
    <div>
      <div class="block">
        <span class="demonstration">默认 click 触发子菜单</span>
        <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"
                     :props="props">
        </el-cascader>
      </div>
    </div>
  </div>
</template>
<style lang="scss" type="text/scss" scoped>
  #Role {
  }
</style>
<script>
  import Vue from 'vue'
  export default{
    data() {
      return {
        name: 'Role',
        options: [],
        selectedOptions: [],
        selectedOptions2: [],
        props: {
          value: 'label',
          children: 'cities'
        }
      }
    },
    mounted() {
      Vue.axios.get('http://test.cn/options').then(response => {
        this.options = response.data.data
        console.log(this.options)
      })
    },
    methods: {
      handleChange(value) {
        console.log(value)
      }
    },
    components: {},
    computed: {}
  }
</script>
