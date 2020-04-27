/**
 * Build npm lib
 */
const shell = require('shelljs')
const signale = require('signale')

const { Signale } = signale
const tasks = ['bootstrap', 'clean', 'build:entry', 'lib', 'build:style']

tasks.forEach((task) => {
  signale.start(task)

  const interactive = new Signale({ interactive: true })
  interactive.pending(task)
  shell.exec(`yarn ${task} --silent`)
  interactive.success(task)
})
