#!/usr/bin/env node
const execSync = require('child_process').execSync
const VERSION = require('../package.json').version
const GIT_COMMIT = execSync('git rev-parse --short HEAD')
  .toString()
  .replace(/\n/, '')

const ghpages = require('gh-pages')
// execSync('yarn build:docs')
ghpages.publish('dist', {
  // user: {
  //   name: 'VictorWang',
  //   email: 'fastid@gmail.com'
  // },
  // repo: 'https://github.com/fastid/musely-ui.git',
  // message: `[deploy] ${GIT_COMMIT} - [release] ${VERSION}`
})
