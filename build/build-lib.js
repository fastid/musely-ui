/**
 * Build npm lib
 */
const shell = require('shelljs')
const signale = require('signale')

const { Signale } = signale
const tasks = ['clean', 'build:entry', 'build:utils', 'build:lib', 'build:theme']

tasks.forEach((task) => {
  signale.start(task)

  const interactive = new Signale({ interactive: true })
  interactive.pending(task)
  if (task === 'build:utils') {
    shell.exec(`yarn ${task}`)
  } else {
    shell.exec(`yarn ${task} --silent`)
  }

  interactive.success(task)
})
