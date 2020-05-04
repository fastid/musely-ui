// 1. 确保在声明补充的类型之前导入 'vue'
import Vue from 'vue'

declare module 'vue/types/vue' {
  // 3. 声明为 VueConstructor 补充install
  interface VueConstructor {
    install: any
  }
  interface Vue {
    install: any
  }
}

declare module 'musely-ui'
