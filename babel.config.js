module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-typescript',
      {
        allExtensions: true,
        isTSX: true
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-typescript'],
  env: {
    utils: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['musely-ui'],
            alias: {
              'musely-ui/src': 'musely-ui/lib'
            }
          }
        ]
      ]
    }
  }
}
