<template>
  <div id="Search">
    <div class="hd">
      <i class="iconfont icon-query"></i>{{title}}
    </div>
    <div class="bd">
      <el-form :inline="true" class="demo-form-inline">
        <input-cell v-for="item in formInputs" :itemCell="item" :ref="item.itemName"></input-cell>
        <el-form-item>
          <el-button type="primary" @click="query"><i class="iconfont icon-query"></i>查询</el-button>
          <el-button type="primary" @click="reset"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" type="text/scss">
  @import "../../assets/Scss/Color";

  #Search {
    margin: 5px;
    .hd {
      background-color: $bg-color_1;
      color: $txt-color_1;
      line-height: 44px;
      padding: 0 15px;
    }
    .bd {
      border: 1px solid $border-color_1;
      font-size: 0;
      padding: 5px 15px;
      button{
        .iconfont{
          font-size: 14px;
        }
      }
    }
  }
</style>
<script>
  export default{
    props: {
      title: {
        default: '',
        type: String
      },
      formInputs: {
        type: Array,
        default: null
      }
    },
    data(){
      return {
        name: 'Compomnents Name'
      }
    },
    mounted(){
//      console.log(this.formInputs);
    },
    methods: {
      reset(){
        console.log('Reset');
      },
      query(){
        let that = this, result = new Object();

        that.formInputs.forEach(function (e, i) {
          result[e.itemName] = that.$refs[e.itemName][0].getValue();
        });

        that.$emit('getRescult', result);
      }
    },
    components: {},
    computed: {}
  }
</script>
