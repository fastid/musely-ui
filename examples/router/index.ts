import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import navConf from '../nav.config.json'

Vue.use(VueRouter)

let routes: RouteConfig[] = []

Object.keys(navConf).forEach((header) => {
  routes = routes.concat((navConf as any)[header])
})

let addComponent = (router: RouteConfig[]) => {
  router.forEach((route: any) => {
    if (route.items) {
      addComponent(route.items)
      routes = routes.concat(route.items)
    } else {
      if (route.type === 'pages') {
        route.component = (r: any) => require.ensure([], () => r(require(`../views/${route.name}/index.vue`)))
        return
      }
      route.component = (r: any) => {
        require.ensure([], () => r(require(`../docs/${route.name}.md`)))
      }
    }
  })
}

addComponent(routes)
const router = new VueRouter({
  mode: 'history', // Disabled due to Github Pages doesn't support this, enable this if you need.
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
