import Vue from 'vue'
import App from './App.vue'

// 导入element-ui
import ElementUi from 'element-ui'

// 导入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'

// 使用element-ui
Vue.use(ElementUi)

// 导入全局初始化样式
import './assets/index.css'

// 路由整合
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入需要路由管理的组件
import discovery from './views/01.discovery.vue'
import playlists from './views/02.playlists.vue'
import songs from './views/03.songs.vue'
import mvs from './views/04.mvs.vue'
import result from './views/05.result.vue'
import playlist from './views/06.playlist.vue'
import mv from './views/07.mv.vue'

const routes = [
  // 配置地址和组件的对应关系
  {
    path: '',
    redirect: '/discovery'
  },
  {
    // 地址
    path: '/discovery',
    // 组件
    component: discovery
  },
  {
    // 地址
    path: '/playlists',
    // 组件
    component: playlists
  },
  {
    // 地址
    path: '/songs',
    // 组件
    component: songs
  },
  {
    // 地址
    path: '/mvs',
    // 组件
    component: mvs
  },
  {
    // 地址
    path: '/result',
    // 组件
    component: result
  },
  {
    // 地址
    path: '/playlist',
    // 组件
    component: playlist
  },
  {
    // 地址
    path: '/mv',
    // 组件
    component: mv
  }
]

const router = new  VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
