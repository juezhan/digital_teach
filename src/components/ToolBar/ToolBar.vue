<template>
  <div id="ToolBar">
    <div class="s-flex bd">
      <div class="logo" :class="{'smail':menuChk}"><img src="/static/images/logo_oa_horizontal.png"/></div>
      <div class="s-flex_item s-flex mn">
        <ul class="s-flex_item menu">
          <li>
            <label class="s-check__label link-btn" for="menuChk">
              <input class="s-check" type="checkbox" id="menuChk" v-on:change="menuChkChange" v-model="menuChk"/><i
              class="el-icon-d-arrow-left"></i>
            </label>
          </li>
          <li v-for="item in menuList">
            <router-link tag="div" class="link-btn" :to="{path:'/'+item.id}">
              <i :class="bindClass(item.iconCls)"></i>{{item.text}}
            </router-link>
          </li>
        </ul>
        <ul class="aside">
          <li>
            <el-button type="text" icon="message">0</el-button>
          </li>
          <li>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                管理员<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人信息修改</el-dropdown-item>
                <el-dropdown-item command="b">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li>
            <el-button type="text" icon="close">0</el-button>
          </li>
          <li>
            <el-select v-model="themeValue" placeholder="请选择" :style="{width:'80px'}">
              <el-option
                v-for="item in themeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" type="text/scss">
  #ToolBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.3);
    .bd {
      height: 65px;
      .logo {
        width: 250px;
        overflow: hidden;
        transition: width .2s;
        &.smail {
          width: 65px;
        }
      }
      .s-check__label {
        display: block;
        cursor: pointer;
      }
      .mn {
        ul {
          text-align: left;
          li {
            display: inline-block;
            margin-left: 20px;
            cursor: pointer;
          }
          &.menu {
            li {
              margin-top: 16px;
              .link-btn {
                line-height: 32px;
                padding: 0 12px;
                &:hover {
                  background-color: #efefef;
                }
                &.router-link-active {
                  background-color: rgb(225, 225, 225);
                }
              }
            }
          }
          &.aside {
            margin-right: 20px;
            li {
              margin-top: 5px;
            }
            button {
              line-height: 36px;
            }
          }
        }
      }
    }
  }
</style>

<script>
  import Vue from 'vue'
  export default{
    props: {
      menuChk: {
        default: false
      }
    },
    data() {
      return {
        name: 'Compomnents Name',
        menuList: [],
        themeOptions: [
          {value: '选项1', label: '浅蓝'},
          {value: '选项2', label: '黑色'},
          {value: '选项3', label: '深蓝'},
          {value: '选项4', label: '蓝灰'},
          {value: '选项5', label: '经典'},
          {value: '选项6', label: '灰色'}
        ],
        themeValue: '浅蓝'
      }
    },
    mounted () {
//      this.menuList
      Vue.axios.get('/api/applications').then((response) => {
        if (response.data.erron === 0) {
          this.menuList = response.data.data
        }
      })
    },
    methods: {
      handleCommand () {
      },
      bindClass (e) {
        return e
      },
      menuChkChange () {
        this.$emit('setSmail', this.menuChk)
      }
    },
    components: {},
    computed: {
      classObject(e) {
        return {
          'iconfont': true
        }
      }
    }
  }
</script>
