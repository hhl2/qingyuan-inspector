import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Try from '@/views/try/index.vue'
import home from '@/views/layout/Home.vue'




// 使用懒加载导入页面组件
const InspectionStation = () => import('@/views/layout/InspectionStation.vue')
const AlertManagement = () => import('@/views/layout/AlertManagement.vue')
const DeviceManagement = () => import('@/views/layout/DeviceManagement.vue')

const kb = () => import('@/views/layout/kb.vue')



// 1. 定义路由规则:ml-citation{ref="2,3" data="citationList"}
const routes = [


  {
    path: '/',
    component: Layout,
    redirect: 'home', // 默认重定向到检测工位
    children: [



      {
        path: 'home',
        name: 'home',
        component: home,
        meta: {
          title: '首页',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showball: false,
        }
      },
      {
        path: "/kb",
        component: kb,
        name: 'kb',
        meta: {
          title: '检测工位',
          showMenu: false,
          keepAlive: false, // 如果需要缓存页面
          showball: false,

        }

      },


      {
        path: 'inspection',
        name: 'Inspection',
        component: InspectionStation,
        meta: {
          title: '检测工位',
          showMenu: true,
          showball: true,
          keepAlive: false, // 如果需要缓存页面

        }
      },
      {
        path: 'alerts',
        name: 'Alerts',
        component: AlertManagement,
        meta: {
          title: '告警管理',
          showMenu: true,

          showball: true,
          keepAlive: false, // 如果需要缓存页面
        }
      },
      {
        path: 'devices',
        name: 'Devices',
        component: DeviceManagement,
        meta: {
          title: '设备管理',
          showMenu: true,
          showball: true,
          keepAlive: false, // 如果需要缓存页面
        }
      }
    ]
  },
  // 404 页面处理
  {
    path: '/:pathMatch(.*)*',
    redirect: '/inspection'
  },
  {
    path: "/try",
    component: Try,
    name: 'Try',

  },
  // router/index.js
  {
    path: '/PixelStreamingIframe',
    name: 'PixelStreamingIframe',
    component: () => import('@/views/PixelStreamingIframe.vue')
  },
  {
    path: '/PageA',
    name: 'PageA',
    component: () => import('@/views/PageA.vue')
  },

]


const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { selector: to.hash }  // 处理锚点跳转干扰^[4][8]
  }
})

export default router
