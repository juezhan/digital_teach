<template>
  <!--用户管理-->
  <div id='User'>
    <search ref='mySearch' :title='searchTitle' :formInputs='inputs' @getRescult='query'></search>
    <div class='my-div'>
      loginName：{{loginName}}<br/>
      userName：{{userName}}<br/>
      userType：{{userType}}<br/>
      isDelivery：{{isDelivery}}<br/>
      type：{{type}}<br/>
      resource：{{resource}}<br/>
      desc：{{desc}}<br/>
    </div>
    <div>
      <el-table :data='tableData' border style='width: 100%'
                :summary-method='getSummaries' show-summary
                :default-sort='{prop: "date", order: "descending"}'>
        <el-table-column type='selection' width='55'></el-table-column>
        <el-table-column prop='date' label='日期' sortable width='180'>
          <template scope='scope'>
            <el-icon name='time'></el-icon>
            <span style='margin-left: 10px'>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop='name' label='姓名' sortable width='180'></el-table-column>
        <el-table-column prop='amount1' label='数值 1（元）' width='120'></el-table-column>
        <el-table-column prop='amount2' label='数值 2（元）' width='120'>></el-table-column>
        <el-table-column prop='amount3' label='数值 3（元）' width='120'>></el-table-column>
        <el-table-column prop='address' label='地址' :formatter='formatter'></el-table-column>
        <el-table-column prop='tag' label='标签' width='100'
                         :filters='[{ text: "家", value: "家" }, { text: "公司", value: "公司" }]' :filter-method='filterTag'
                         filter-placement='bottom-end'></el-table-column>
      </el-table>
      <div class='block'>
        <span class='demonstration'>完整功能</span>
        <el-pagination
          @size-change='handleSizeChange'
          @current-change='handleCurrentChange'
          :current-page='currentPage4'
          :page-sizes='[20, 40, 60, 80]'
          :page-size='20'
          layout='total, sizes, prev, pager, next, jumper'
          :total='200'>
        </el-pagination>
      </div>
    </div>
    <hr/>
    <button @click='f1'>asdf</button>
    <div style='width: 400px;height: 400px;'>
      <canvas ref='myChart' width='400' height='400'></canvas>
    </div>
  </div>
</template>
<style lang='scss' type='text/scss' scoped>
  #User {
    text-align: left;
    .my-div {
      /*transform: rotate(45deg);*/
    }
  }
</style>
<script>
  /* eslint-disable no-unused-vars */

  import Vue from 'vue'
  import Chart from 'chart.js'
  import data from '../../../../util/mock'

  export default{
    data() {
      return {
        name: 'User',
        searchTitle: '用户查询',
        loginName: '',
        userName: '',
        userType: '-1',
        isDelivery: false,
        type: ['地推活动', '单纯品牌曝光'],
        resource: '',
        desc: '',
        chkValues: [],
//        搜索框
        inputs: [
          {'title': '登录名', 'type': 'text', 'itemName': 'loginName'},
          {'title': '姓名', 'type': 'text', 'itemName': 'userName'},
          {
            'title': '类型',
            'type': 'select',
            'itemName': 'userType',
            'options': [
              {'value': '1', 'text': 'A'},
              {'value': '2', 'text': 'B'},
              {'value': '3', 'text': 'C'}
            ]
          },
          {'title': '即时配送', 'type': 'switch', 'itemName': 'isDelivery'},
          {
            'title': '活动性质',
            'type': 'checkboxGroup',
            'itemName': 'type',
            'options': [
              {'value': '1', 'text': '美食/餐厅线上活动'},
              {'value': '2', 'text': '地推活动'},
              {'value': '3', 'text': '线下主题活动'},
              {'value': '3', 'text': '单纯品牌曝光'}
            ]
          },
          {
            'title': '特殊资源',
            'type': 'radioGroup',
            'itemName': 'resource',
            'options': [
              {'value': '1', 'text': '线上品牌商赞助'},
              {'value': '2', 'text': '线下场地免费'}
            ]
          },
          {
            'title': '活动形式',
            'type': 'textarea',
            'itemName': 'desc'
          }
        ],
        tableData: [],
        currentPage4: 4
      }
    },
    mounted() {
      let that = this
      this.inputs.forEach(function (e, i) {
        Vue.set(e, 'defaultValue', that[e.itemName])
      })

      Vue.axios.get('http://test.cn/userlist').then((response) => {
        this.tableData = response.data.data
      })

      var myChart = new Chart(this.$refs.myChart, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
      this.searchTitle = 'searchTitle'
    },
    methods: {
      f1() {
        console.log(this['loginName'])
      },
      f2() {
        console.log('f2')
      },
      query(_result) {
        let that = this
        for (let e in _result) {
          that[e] = _result[e]
        }
      },
      formatter(row, column) {
        return row.address
      },
      filterTag(value, row) {
        return row.tag === value
      },
      getSummaries(param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价'
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = values.length + '条'
          }
        })

        return sums
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    },
    components: {},
    computed: {}
  }
</script>
