module.exports = {
  plugins: {
    autoprefixer: {}
  },
  features: {
    bem: {
      shortcuts: {
        component: 'b',
        modifier: 'm',
        descendent: 'e'
      },
      separators: {
        descendent: '__',
        modifier: '--'
      }
    }
  }
}
