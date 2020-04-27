const fs = require('fs')
const path = require('path')

const excludes = ['index.ts', 'indexBak.ts', 'typings.d.ts', 'theme-default', '.DS_Store']

module.exports = function() {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../packages'))
  return dirs.filter((dirName) => excludes.indexOf(dirName) === -1)
}
