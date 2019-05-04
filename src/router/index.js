import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [{
  path: '/login',
  component: () => import('../components/login.vue')
}]

export const asyncRouterMap = [
  {
    path: '/',
    redirect: '/Admin/PageOne'
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import('../components/Admin.vue'),
    meta: {
      requiresAuth: true
    },
    children: [{
      path: '',
      redirect: 'PageOne',
      meta: {
        requiresAuth: true
      },
    },
    {
      path: 'PageOne',
      name: 'PageOne',
      component: () => import('../components/page/PageOne.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: 'tabularData',
      name: 'tabularData',
      component: () => import('../components/page/tabularData.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'productEdit',
          name: 'productEdit',
          component: () => import('../components/page/productEdit.vue')
        }
      ]
    },
    {
      path: 'addCommodity',
      name: 'addCommodity',
      component: () => import('../components/page/addCommodity.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: 'addSort',
      name: 'addSort',
      component: () => import('../components/page/addSort.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: 'ordersComputing',
      name: 'ordersComputing',
      component: () => import('../components/page/ordersComputing.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: 'orderEdit',
      name: 'orderEdit',
      component: () => import('../components/page/orderEdit.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: 'HelloWorld',
      name: 'HelloWorld',
      component: () => import('../components/HelloWorld.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: 'testPage',
      name: 'testPage',
      component: () => import('../components/page/testPage.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '*',
      name: 'Lost',
      component: () => import('../components/404.vue'),
    },
    ]
  },
  {
    path: '*',
    name: 'Lost',
    component: () => import('../components/404.vue'),
  },
]

const router = new Router({

  routes: constantRouterMap

})


export default router
