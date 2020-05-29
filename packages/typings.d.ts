// 1. 确保在声明补充的类型之前导入 'vue'
import Vue from 'vue'

import VueRouter, { Route } from 'vue-router'
// 2. 定制一个文件，设置你想要补充的类型
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface VueConstructor {
    install: any
    options: any
    ComponentName: string
  }
  interface Vue {
    install: any
    $router: VueRouter
    $route: Route
  }
}

// ComponentOptions 声明于 types/options.d.ts 之中
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    name?: string
    componentName?: string
  }
}
