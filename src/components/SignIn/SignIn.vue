<!--
描述：用户登录组件
开发人：桑杨
开发日期：2017年7月14日
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
        <el-form-item label=" " >
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
  import router from '../../router'
  //  import store from '../../store/store'

  import axios from 'axios'
  import store from 'store/store'

  export default {
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
              let data = response.data
              if (data.success) {
//                this.$store.state.user.name = data.user.name
//                this.$store.state.access_token = data.access_token
//                this.$message.error(data.message)
                sessionStorage.setItem('id', data.user.id)
                sessionStorage.setItem('access_token', data.access_token)
                sessionStorage.setItem('user_token', data.user.token)
                console.log(data.access_token)
                store.commit({
                  type: 'increment',
                  access_token: data.access_token,
                  user_name: data.user.name,
                  user_token: data.user.token,
                  user_id: data.user.id
                })

                router.push({path: '/'})
              } else {
                this.$message.error(data.message)
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            return false
          }
        })
      }
    },
    components: {},
    computed: {}
  }
</script>

