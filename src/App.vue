<template lang="pug" src="./App.pug">

</template>

<script>
  import {name} from './App.toml'

  export default {
    name: name
  }
</script>

<style lang="scss" type="text/scss">

  @import "./resource/css/icon-font.css";
  @import "./resource/scss/comm";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
