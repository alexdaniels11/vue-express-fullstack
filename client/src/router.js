import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/proposals',
      name: 'proposals',
      component: () => import(/* webpackChunkName: "proposals" */ '@/components/Proposals/Proposals.vue')
    }
  ]
})
