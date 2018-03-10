#!/usr/bin/env node

const chalk = require('chalk')
const promptMenu = require('../prompt-menu')
const setup = require('../setup')

console.log(chalk.yellow(`\nOpinionated chores tool "Chores" ❤️\n`))

async function chores() {
  const { language, utils } = await promptMenu()
  await setup(language, utils)
}

chores()
  .then(success => {
    console.log(chalk.green(`\nSetup Finished 👍  👍  👍\n`))
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
