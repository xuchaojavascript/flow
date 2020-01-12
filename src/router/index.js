import Vue from 'vue'
import VueRouter from 'vue-router'
import Flow from '@/views/flow/flow.vue'
import FlowTwo from '@/views/flowTwo/flowTwo.vue'
import FlowThree from '@/views/flowThree/flowThree.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'flow-three',
    component: FlowThree,
    children: [
      {
        path: '/flow',
        name: 'flow',
        component: Flow
      },
      {
        path: '/flow-two',
        name: 'flow-two',
        component: FlowTwo
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
