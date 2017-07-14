<template>
  <div id="treeList" :class="{'smail':menuChk}">
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
                <router-link tag="div" class="tit" :to="{path:'/'+item2.routeId}"><i
                  :class="bindClass(item2.text)"></i>{{item2.text}}
                </router-link>
              </li>
            </ul>
          </div>
        </el-collapse-transition>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" type="text/scss">
  #treeList {
    width: 250px;
    height: 100%;
    background-color: #32404e;
    color: #ffffff;
    text-align: left;
    overflow: hidden;
    transition: width .2s;
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
<script>
  import Vue from 'vue';
  export default{
    props: {
      menuChk: {
        default: false,
      }
    },
    data(){
      return {
        name: 'Compomnents Name',
        currName: '',
        currApp: '',
        activeName: '1',
        treeData_1: [],
        treeData_2: [
          {'name': '用户管理', 'parentId': 1, 'id': 1, 'icon': 'iconfont icon-user-management', 'routeName': 'AdminUser'},
          {'name': '角色管理', 'parentId': 1, 'id': 2, 'icon': 'iconfont icon-role-management', 'routeName': 'AdminRole'},
          {
            'name': '工作组管理',
            'parentId': 1,
            'id': 3,
            'icon': 'iconfont icon-workgroup-management',
            'routeName': 'AdminWorkgroup'
          },
          {
            'name': '组织机构图',
            'parentId': 2,
            'id': 4,
            'icon': 'iconfont icon-organization-chart',
            'routeName': 'AdminOrgchart'
          },
          {'name': '机构管理', 'parentId': 2, 'id': 5, 'icon': 'iconfont icon-organization-management', 'routeName': 'Org'},
          {'name': '职务管理', 'parentId': 2, 'id': 6, 'icon': 'iconfont icon-duty-management', 'routeName': 'Duty'},
          {'name': '机构人员管理', 'parentId': 2, 'id': 7, 'icon': 'iconfont icon-role-management', 'routeName': 'OrgUser'},
          {
            'name': '应用管理',
            'parentId': 3,
            'id': 8,
            'icon': 'iconfont icon-application-management',
            'routeName': 'Application'
          },
          {
            'name': '功能管理',
            'parentId': 3,
            'id': 9,
            'icon': 'iconfont icon-function-management',
            'routeName': 'Function'
          },
          {'name': '字典管理', 'parentId': 3, 'id': 10, 'icon': 'iconfont icon-dict-management', 'routeName': 'AdminDict'},
          {'name': '审计管理', 'parentId': 3, 'id': 11, 'icon': 'iconfont icon-operation-management', 'routeName': 'Audit'},
          {'name': '审计配置管理', 'parentId': 3, 'id': 12, 'icon': 'iconfont icon-config', 'routeName': 'auditconfig'},
          {
            'name': '状态机管理',
            'parentId': 3,
            'id': 13,
            'icon': 'iconfont icon-system-statemachine',
            'routeName': 'statemachine'
          },
          {
            'name': '模板管理',
            'parentId': 3,
            'id': 14,
            'icon': 'iconfont icon-operation-management',
            'routeName': 'Template'
          },
          {'name': '公司新闻', 'parentId': 4, 'id': 15, 'icon': 'iconfont icon-common-news', 'routeName': ''},
          {'name': '公司公告', 'parentId': 4, 'id': 16, 'icon': 'iconfont icon-common-notice', 'routeName': ''},
          {'name': '发件箱', 'parentId': 5, 'id': 17, 'icon': 'iconfont icon-outbox', 'routeName': ''},
          {'name': '收件箱', 'parentId': 5, 'id': 18, 'icon': 'iconfont icon-inbox', 'routeName': ''},
          {'name': '字典管理', 'parentId': 6, 'id': 19, 'icon': 'iconfont icon-dict-management', 'routeName': ''},
          {'name': '流程申请', 'parentId': 7, 'id': 20, 'icon': 'iconfont icon-process-apply', 'routeName': ''},
          {'name': '用工申请', 'parentId': 7, 'id': 21, 'icon': 'iconfont icon-recruit', 'routeName': ''},
          {'name': '入职申请', 'parentId': 7, 'id': 22, 'icon': 'iconfont icon-employ', 'routeName': ''},
          {'name': '会议申请', 'parentId': 7, 'id': 23, 'icon': 'iconfont icon-meeting-apply', 'routeName': ''},
          {'name': '会议室申请', 'parentId': 7, 'id': 24, 'icon': 'iconfont icon-meeting-room-apply', 'routeName': ''},
          {'name': '印章使用申请', 'parentId': 7, 'id': 25, 'icon': 'iconfont icon-seal', 'routeName': ''},
          {'name': '公务用车申请', 'parentId': 7, 'id': 26, 'icon': 'iconfont icon-public-car', 'routeName': ''},
          {'name': '出差申请', 'parentId': 7, 'id': 27, 'icon': 'iconfont icon-evection', 'routeName': ''},
          {'name': '报销申请', 'parentId': 7, 'id': 28, 'icon': 'iconfont icon-workflow-reimbursement', 'routeName': ''},
          {'name': '待办流程', 'parentId': 8, 'id': 29, 'icon': 'iconfont icon-task', 'routeName': ''},
          {'name': '我的流程', 'parentId': 8, 'id': 30, 'icon': 'iconfont icon-history', 'routeName': ''},
          {'name': '我参与的流程', 'parentId': 8, 'id': 31, 'icon': 'iconfont icon-involved-history', 'routeName': ''},
          {'name': '应聘人员管理', 'parentId': 8, 'id': 32, 'icon': 'iconfont icon-candidate', 'routeName': ''},
          {'name': '面试管理', 'parentId': 8, 'id': 33, 'icon': 'iconfont icon-interview', 'routeName': ''},
          {'name': '试讲管理', 'parentId': 8, 'id': 34, 'icon': 'iconfont icon-lecture', 'routeName': ''},
          {'name': '流程分类管理', 'parentId': 9, 'id': 35, 'icon': 'iconfont icon-category', 'routeName': ''},
          {
            'name': '流程定义管理',
            'parentId': 9,
            'id': 36,
            'icon': 'iconfont icon-process-definition-management',
            'routeName': ''
          },
          {'name': '流程历史', 'parentId': 9, 'id': 37, 'icon': 'iconfont icon-history', 'routeName': ''},
          {'name': '会议室管理', 'parentId': 10, 'id': 38, 'icon': 'iconfont icon-meeting-room', 'routeName': ''},
          {'name': '字典管理', 'parentId': 10, 'id': 39, 'icon': 'iconfont icon-dict-management', 'routeName': ''},
          {
            'name': '个人计划',
            'parentId': 11,
            'id': 40,
            'icon': 'iconfont icon-schedule-planmanager-personal',
            'routeName': ''
          },
          {
            'name': '部门计划',
            'parentId': 11,
            'id': 41,
            'icon': 'iconfont icon-schedule-planmanager-department',
            'routeName': ''
          },
          {'name': '工作汇报', 'parentId': 11, 'id': 42, 'icon': 'iconfont icon-schedule-workreport', 'routeName': ''},
          {'name': '工作总结', 'parentId': 11, 'id': 43, 'icon': 'iconfont icon-schedule-worksummary', 'routeName': ''},
          {'name': '计划模板', 'parentId': 11, 'id': 44, 'icon': 'iconfont icon-schedule-template', 'routeName': ''},
          {'name': '布置任务', 'parentId': 12, 'id': 45, 'icon': 'iconfont icon-schedule-task-assignment', 'routeName': ''},
          {
            'name': '个人计划查询',
            'parentId': 13,
            'id': 46,
            'icon': 'iconfont icon-schedule-personalplansearch',
            'routeName': ''
          },
          {
            'name': '部门计划查询',
            'parentId': 13,
            'id': 47,
            'icon': 'iconfont icon-schedule-departmentplansearch',
            'routeName': ''
          },
          {
            'name': '工作汇报查询',
            'parentId': 13,
            'id': 48,
            'icon': 'iconfont icon-schedule-workreportsearch',
            'routeName': ''
          },
          {
            'name': '工作总结查询',
            'parentId': 13,
            'id': 49,
            'icon': 'iconfont icon-schedule-worksummarysearch',
            'routeName': ''
          },
          {'name': '任务统计', 'parentId': 13, 'id': 50, 'icon': 'iconfont icon-schedule-task-assignment', 'routeName': ''},
          {'name': '字典管理', 'parentId': 14, 'id': 51, 'icon': 'iconfont icon-dict-management', 'routeName': ''},

        ],
        obj: {'name': 'aa'},
        treeData: {
          admin: [
            {'name': '权限管理', 'id': 1, 'icon': 'iconfont icon-permission', 'routeName': ''},
            {'name': '组织机构', 'id': 2, 'icon': 'iconfont icon-organization', 'routeName': ''},
            {'name': '系统管理', 'id': 3, 'icon': 'iconfont icon-system', 'routeName': ''},
          ],
          common: [
            {'name': '新闻公告', 'id': 4, 'icon': 'iconfont icon-common-both', 'routeName': ''},
            {'name': '消息通知', 'id': 5, 'icon': 'iconfont icon-message', 'routeName': ''},
            {'name': '系统管理', 'id': 6, 'icon': 'iconfont icon-system', 'routeName': ''},
          ],
          oa: [
            {'name': '业务流程', 'id': 7, 'icon': 'iconfont icon-process-definition', 'routeName': ''},
            {'name': '个人办公', 'id': 8, 'icon': 'iconfont icon-work', 'routeName': ''},
            {'name': '流程管理', 'id': 9, 'icon': 'iconfont icon-process', 'routeName': ''},
            {'name': '系统管理', 'id': 10, 'icon': 'iconfont icon-system', 'routeName': ''},
          ],
          schedule: [
            {'name': '计划管理', 'id': 11, 'icon': 'iconfont icon-schedule-planmanager', 'routeName': ''},
            {'name': '任务管理', 'id': 12, 'icon': 'iconfont icon-schedule-taskmanager', 'routeName': ''},
            {'name': '统计查询', 'id': 13, 'icon': 'iconfont icon-schedule-statisticsquery', 'routeName': ''},
            {'name': '系统管理', 'id': 14, 'icon': 'iconfont icon-system', 'routeName': ''},
          ],
        }
      }
    },
    mounted(){
      this.fetchdata();
    },
    watch: {'$route': 'fetchdata'},
    methods: {
      fetchdata(){
        this.currName = this.$route.params.name || 'admin';
        this.currApp = this.$route.params.app;

        Vue.axios.get('/api/' + this.currName).then((response) => {
          if (response.data.erron == 0) {
            this.treeData = response.data.data;
            this.treeData.forEach(function (e, i) {
              Vue.set(e, 'isShow', false);
            });
          }
        });
      },
      setShow(item){
        let routeName = this.currName + '/' + this.currApp;
        if (item.children) {
          let temp = item.children.find(function (e) {
            return e.routeId == routeName;
          });
          return temp != null || item.isShow;
        } else {
          return false;
        }
      },
      bindTree(_id){
        return this.treeData_2.filter(function (item) {
          return item.parentId == _id;
        });
      },
      bindClass(e){
        return e;
      },
      showTree(e){
        let _item = (this.treeData.filter(function (item) {
          if (item != e) {
            item.isShow = false
          } else {
            return e;
          }
        }))[0];
        e.isShow = !_item.isShow;
      },
      showIcon(e){
        return e ? 'el-icon-caret-bottom' : 'el-icon-caret-right'
      }
    },
    components: {}
  }
</script>
