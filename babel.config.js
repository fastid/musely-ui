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
  plugins: ['@babel/plugin-transform-typescript']
}
