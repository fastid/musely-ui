import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import navConf from '../settings/nav.json'

Vue.use(VueRouter)

let routes: RouteConfig[] = []

Object.keys(navConf).forEach((p) => {
  routes = routes.concat((navConf as any)[p])
})

const addComponent = (router: RouteConfig[]) => {
  router.forEach((route: any) => {
    if (route.items) {
      addComponent(route.items)
      routes = routes.concat(route.items)
    } else {
      if (route.type === 'pages') {
        route.component = () => import(`@/views/${route.name}/index.vue`)
        return
      }
      route.component = () => import(`@/docs/${route.name}.md`)
    }
  })
}

addComponent(routes)
const router = new VueRouter({
  mode: 'hash', // history or hash Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router
