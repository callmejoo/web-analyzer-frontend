import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/index'
import Visitor from '@/visitor'
import User from '@/user'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/visitor',
    name: 'Visitor',
    component: Visitor
  }, {
    path: '/user',
    name: 'User',
    component: User
  }]
})

