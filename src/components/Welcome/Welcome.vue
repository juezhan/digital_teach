<template>
  <div id="welcome">
    <div>Welcome to <b>{{name}}</b></div>
  </div>
</template>
<style lang="scss" type="text/scss">
  #welcome {
  }
</style>
<script>
  export default{
    data() {
      return {
        name: ''
      }
    },
    mounted() {
      this.fetchdata()
    },
    watch: {'$route': 'fetchdata'},
    methods: {
      fetchdata() {
        this.name = this.$route.params.name
//        console.log(this.$route.params.name);
      }
    },
    components: {},
    computed: {}
  }
</script>
