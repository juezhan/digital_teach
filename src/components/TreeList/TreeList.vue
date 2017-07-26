<!--
描述：左侧树形控件
开发人：桑杨
开发日期：2017年7月17日
-->
<template>
  <div class="treeList" :class="{'smail':menuChk}">
    <ul class="bd">
      <li v-for="item in treeData">
        <div class="s-flex tit" @click="showTree(item,$event)">
          <div class="s-flex_item">
            <i class="tit_icon" :class="bindClass(item.iconCls)"></i><span class="txt">{{item.text}}</span>
          </div>
          <div class="arrow">
            <i :class="showIcon(item.isShow)"></i>
          </div>
        </div>
        <el-collapse-transition>
          <div class="mn" v-show="setShow(item)">
            <ul>
              <li v-for="item2 in item.children">
                <router-link tag="div" class="tit" :to="{path:'/'+item2.routeId}">
                  <i class="tit_icon" :class="bindClass(item2.iconCls)"></i>{{item2.text}}
                </router-link>
              </li>
            </ul>
          </div>
        </el-collapse-transition>
      </li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'
  //  import axios from 'axios'
  import {CacheTime, RequestApi} from 'api/config'

  export default {
    props: {
      menuChk: {
        default: false
      }
    },
    data() {
      return {
        name: 'Compomnents Name',
        currName: '',
        currApp: '',
        activeName: '1',
        obj: {'name': 'aa'},
        treeData: []
      }
    },
    mounted() {
      this.fetchdata()
    },
    watch: {'$route': 'fetchdata'},
    methods: {
      fetchdata() {
        let d = new Date()
        let cd = d.getTime()
        let treeListData = {}
        this.currName = this.$route.params.name || 'admin'
        this.currApp = this.$route.params.app
        if (localStorage.getItem('treeListData')) {
          treeListData = JSON.parse(localStorage.getItem('treeListData'))
        }
        if (treeListData.createDate && (treeListData.createDate - cd) < CacheTime && treeListData[this.currName]) {
          this.treeData = treeListData[this.currName]
        } else {
          const data = {_dc: cd, node: 'root'}
          Vue.axios({
            url: RequestApi.SystemApplications[this.currName],
            method: 'get',
//            headers: {'AccessToken': accessToken, JSESSIONID: userToken},
            params: data
          }).then(response => {
            let nowDate = new Date()
            this.treeData = response.data
            this.treeData.forEach(function (e, i) {
              Vue.set(e, 'isShow', false)
            })
            treeListData[this.currName] = this.treeData
            treeListData.createDate = nowDate.getTime()
            localStorage.setItem('treeListData', JSON.stringify(treeListData))
          })
        }
      },
      setShow(item) {
        let routeName = this.currName + '/' + this.currApp
        if (item.children) {
          let temp = item.children.find(function (e) {
            return e.routeId === routeName
          })
          return temp != null || item.isShow
        } else {
          return false
        }
      },
      bindClass(e) {
        return e
      },
      showTree(e) {
        let _item = (this.treeData.filter(function (item) {
          if (item !== e) {
            item.isShow = false
          } else {
            return e
          }
        }))[0]
        e.isShow = !_item.isShow
      },
      showIcon(e) {
        return e ? 'el-icon-caret-bottom' : 'el-icon-caret-right'
      }
    },
    components: {}
  }
</script>

<style scoped lang="scss" type="text/scss">
  .treeList {
    width: 250px;
    height: 100%;
    background-color: #32404e;
    color: #ffffff;
    text-align: left;
    overflow: hidden;
    transition: width .2s;
    z-index: 9999;
    li {
      width: 250px;
    }
    .tit {
      height: 64px;
      line-height: 64px;
      padding-left: 22px;
      padding-right: 12px;
      color: #adb3b8;
      position: relative;
      transition: color 0.5s;
      cursor: pointer;
      .tit_icon {
        margin-right: 12px;
        font-size: 24px;
      }
      .txt,
      .arrow {
        transition: opacity .2s;
      }
      .txt {
        display: inline-block;
      }
      .arrow {
        width: 12px;
      }
      &:hover {
        background-color: #3c4a57;
        color: #d6d9dc;
      }
    }

    &.smail {
      width: 65px;
      .tit {
        .txt,
        .arrow {
          opacity: 0;
        }
      }
    }
    .mn {
      .tit {
        padding-left: 44px;
        &:before {
          top: 0;
          left: 0;
          bottom: 0;
          width: 5px;
          background-color: #42b983;
          content: '';
          position: absolute;
          display: block;
          visibility: hidden;
        }
        &.router-link-exact-active {
          &:before {
            visibility: visible;
          }
        }
      }
    }
  }
</style>
