<template>
  <el-form-item :label="itemCell.title">
    <el-input v-if="itemCell.type=='text'" v-model="inputValue" placeholder="请输入内容"></el-input>
    <el-select v-if="itemCell.type=='select'" v-model="inputValue">
      <el-option value="-1" label="请选择"></el-option>
      <el-option v-for="item in itemCell.options" :label="item.text" :value="item.value" :key="item.id"></el-option>
    </el-select>
    <el-switch v-if="itemCell.type=='switch'" on-text="ON" off-text="关" v-model="inputValue"></el-switch>
    <el-checkbox-group v-if="itemCell.type=='checkboxGroup'" v-model="inputValue">
      <el-checkbox v-for="item in itemCell.options" :label="item.text" :value="item.value"
                   :key="item.id" :name="itemCell.itemName"></el-checkbox>
    </el-checkbox-group>
    <el-radio-group v-if="itemCell.type=='radioGroup'" v-model="inputValue">
      <el-radio v-for="item in itemCell.options" :label="item.text" :value="item.value" :key="item.id"
                :name="itemCell.itemName"></el-radio>
    </el-radio-group>
    <el-input v-if="itemCell.type=='textarea'" type="textarea" v-model="inputValue"></el-input>
  </el-form-item>
</template>
<style lang="scss" type="text/scss">
</style>
<script>
  export default{
    props: {
      title: {
        default: '',
        type: String
      },
      inputType: {
        default: '',
        type: String
      },
      options: {
        default: null,
        type: Array
      },
      defaultValue: {
        default: '',
        type: String
      },
      itemName: {
        default: '',
        type: String
      },
      itemCell: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        name: 'Compomnents Name',
        inputValue: ''
      }
    },
    updated() {
//      console.log('updated');
      this.inputValue = this.inputValue || this.itemCell.defaultValue
    },
    activated() {
//      console.log('activated');
    },
    mounted() {
//      console.log('mounted');
    },
    methods: {
      getValue() {
//          console.log('getValue')
        return this.inputValue
      }
    },
    components: {},
    computed: {}
  }
</script>
