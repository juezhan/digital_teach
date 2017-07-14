<template>
  <div id="myDiv">
    <label><input type="checkbox" :value="value"/><i></i>{{text}}</label>
  </div>
</template>
<style lang="scss" type="text/scss">
  #myDiv {
  }
</style>
<script>
  export default{
    props: {
      value: {
        default: '',
        type: String
      },
      text: {
        default: '',
        type: String
      },
      isChecked: {
        default: false,
        tyle: Boolean
      }
    },
    data(){
      return {
        name: 'Compomnents Name'
      }
    },
    methods: {},
    components: {},
    computed: {}
  }
</script>
