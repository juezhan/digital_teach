import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home/Home'
import SignIn from '@/components/SignIn/SignIn'
// import store from '../store/store'
// import Welcome from '@/components/Welcome/Welcome'

// import AdminUser from '@/components/Admin/User/User'
// import AdminRole from '@/components/Admin/Role/Role'

Vue.use(Router)

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
        {path: '/:name', name: 'Welcome', component: Home},
        {path: '/:name/:app', name: 'Welcome', component: Home}
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('id') === null && to.name !== 'SignIn') {
    next({path: '/signin'})
  }
  next()
})

export default router
