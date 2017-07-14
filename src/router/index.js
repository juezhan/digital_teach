import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello';
import Home from '@/components/Home/Home';
import Welcome from '@/components/Welcome/Welcome';

import AdminUser from '@/components/Admin/User/User';
import AdminRole from '@/components/Admin/Role/Role';

import SignIn from '@/components/SignIn/SignIn';

Vue.use(Router);


import store from '../store/store';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {path: '/:name', name: 'Welcome', component: Home,},
        {path: '/:name/:app', name: 'Welcome', component: Home,}
      ]
    },
  ]
});
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  //store.state.count == 0
  if (store.state.count == 0 && to.name != 'SignIn') {
    next({path: '/signin'});
  }
  next();
  // next('/signin', false);
});


export default router;
