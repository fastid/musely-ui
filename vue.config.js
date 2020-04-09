// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vueMarkdown = require('./vueMarkdown')
// If your port is set to 80,
const devServerPort = 8018 // TODO: get this variable from setting.ts
const name = 'Musely-UI' // TODO: get this variable from setting.ts

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
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
    plugins: []
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
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
    config.resolve.alias.set('@', path.join(__dirname, 'examples'))

    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', (config) =>
      config.devtool('cheap-module-eval-source-map')
    )
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        preset: 'default',
        breaks: true,
        raw: true,
        typographer: true,
        preprocess: vueMarkdown.preprocess,
        use: vueMarkdown.use
      })
    // .options(vueMarkdown)

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'examples/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
