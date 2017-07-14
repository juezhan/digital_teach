/**
 * Created by Administrator on 2017/7/6.
 */

import Mock from 'mockjs';
let Random = Mock.Random;
let images = function () {

};

let add = Mock.mock('http://test.cn/add', {
  'data|5': [{
    'name': '@cname',
    'age|1-50': 1,
    'relevant': '@cname',
    'image': Random.image('200x200', Random.color(), Random.cword())
  }]
});

let list = Mock.mock('http://test.cn/list', {
  'data|10': [{
    'name': '@cname',
    'age|1-50': 1,
    'relevant': '@cname',
    'image': Random.image('200x200', Random.color(), Random.cword())
  }]
});

let usersList = Mock.mock('http://test.cn/userlist', {
  'data|20': [{
    'id|+1': 1,
    'name': '@cname',
    'tag': '@csentence(2, 4)',
    'age|1-50': 1,
    'date': '@date',
    'amount1|1-100.2': 100,
    'amount2|1-100.2': 100,
    'amount3|1-10': 10,
    'image': Random.image('200x200', Random.color(), Random.cword()),
    'address': '@county(true)'
  }]
});

let options = Mock.mock('http://test.cn/options', {
  'data|5': [{
    'id|+1': 1,
    'label': '@province',
  }]
});

export default {
  add,
  list,
  usersList,
  options
}
