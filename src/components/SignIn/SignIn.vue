<!--
描述：
开发人：
开发日期：
-->
<template>
  <div class="sign-in">
    <div class="form">
      <div class="logo"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')" size="large" class="btn-submit">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" type="text/scss" scoped>
  .sign-in {
    .form {
      margin: 0 auto;
      width: 380px;
      .logo {
        width: 100%;
        height: 159px;
        margin-bottom: 30px;
        background-image: url("./login_oa_top.png");
      }
      .demo-ruleForm {
        margin-left: -100px;
      }
      .btn-submit {
        display: block;
        width: 100%;
      }
    }
  }
</style>
<script>
  //  import Vue from 'vue'
  //  import router from '../../router'
  //  import store from '../../store/store'
  import axios from 'axios'

  export default{
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }

      return {
        name: 'Compomnents Name',
        ruleForm: {
          name: '',
          pass: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 8, message: '用户名长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        let that = this
//        console.log(store.state.count)

        this.$refs[formName].validate((valid) => {
          if (valid) {
//            alert('submit!')

            if (that.ruleForm.name === 'admin' && that.ruleForm.pass === '123') {
              axios.request({
                method: 'POST',
                url: 'http://localhost:8181/login.jsp',
                transformRequest: [(data) => {
                  // Do whatever you want to transform the data
                  let ret = ''
                  for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                  }
                  return ret
                }],
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                  'username': that.ruleForm.name,
                  'password': that.ruleForm.pass
                }
              }).then(response => {
                console.log(response.data)
              }).catch(error => {
                console.log(error)
              })
//              console.log(router)
// http://localhost:5005/SubmitHandler.ashx
//              Vue.axios({
//                method: "POST",
//                url: 'http://localhost:8181/login.jsp',
//                responseType: 'json',
//                data: {
//                  'username': that.ruleForm.name,
//                  'password': that.ruleForm.pass
//                }
//              }).then((response) => {
//                console.log(response.data)
//
//                this.$message('登录成功！')
//                store.commit('increment')
//                console.log(store.state.count)
//                router.push({path: '/'})
//
//              })
            } else {
              this.$message.error('用户名或密码错误')
            }
          } else {
//            console.log('error submit!!')
            return false
          }
        })
      }
    },
    components: {},
    computed: {}
  }
</script>

