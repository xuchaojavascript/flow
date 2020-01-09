import Vue from 'vue'
import VueRouter from 'vue-router'
import flow from '@/views/flow/flow.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'flow',
    component: flow
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
