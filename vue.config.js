const fs = require('fs')
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
// If your port is set to 80,
const devServerPort = 8018 // TODO: get this variable from setting.ts
const name = 'Musely-UI' // TODO: get this variable from setting.ts
const prod = process.env.NODE_ENV === 'production'
const dev = process.env.NODE_ENV === 'development'

const utilsList = fs.readdirSync(path.resolve(__dirname, './src/utils'))
const mixinsList = fs.readdirSync(path.resolve(__dirname, './src/mixins'))
const externals = {}
utilsList.forEach((file) => {
  file = path.basename(file, '.js')
  externals[`musely-ui/src/utils/${file}`] = `musely-ui/lib/utils/${file}`
})
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`musely-ui/src/mixins/${file}`] = `musely-ui/lib/mixins/${file}`
})
module.exports = {
  publicPath: prod ? '/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    // 关闭 host header检测
    disableHostCheck: true,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html'
    }
  },
  configureWebpack: {
    plugins: [],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'examples'),
        '~': path.join(__dirname, 'packages'),
        types: path.join(__dirname, 'types'),
        'musely-ui': path.resolve(__dirname, './')
      }
    },
    externals: process.env.NODE_ENV === 'production' ? externals : {}
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'examples/styles/_variables.scss'),
        path.resolve(__dirname, 'examples/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack: (config) => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
    // config.resolve.alias
    //   .set('@', path.join(__dirname, 'examples'))
    //   .set('~', path.join(__dirname, 'packages'))
    //   .set('types', path.join(__dirname, 'types'))

    // https://webpack.js.org/configuration/devtool/#development
    config.when(dev, (config) => config.devtool('cheap-module-eval-source-map'))

    // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        // 修改它的选项...
        return options
      })
    // lib目录是组件库最终打包好存放的地方，不需要eslint检查,examples/docs是存放md文档的地方，也不需要eslint检查
    config.module
      .rule('eslint')
      .exclude.add(path.resolve('lib'))
      .end()
      .exclude.add(path.resolve('examples/docs'))
      .end()
    // 识别markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('markdown-it')
      .loader(path.resolve(__dirname, './build/vueMarkdown.js'))
    // .end()
    // .use('vue-markdown-loader')
    // .loader('vue-markdown-loader/lib/markdown-compiler')
    // .options({
    //   raw: true,
    //   ...vueMarkdown
    // })

    // config.when(process.env.NODE_ENV !== 'development', (config) => {
    //   config.optimization.splitChunks({
    //     chunks: 'all',
    //     cacheGroups: {
    //       libs: {
    //         name: 'chunk-libs',
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: 10,
    //         chunks: 'initial' // only package third parties that are initially dependent
    //       },
    //       commons: {
    //         name: 'chunk-commons',
    //         test: path.resolve(__dirname, 'examples/components'),
    //         minChunks: 3, //  minimum common number
    //         priority: 5,
    //         reuseExistingChunk: true
    //       }
    //     }
    //   })
    //   config.optimization.runtimeChunk('single')
    // })
  }
}
