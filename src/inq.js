const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')

const setup = require('./setup')

console.log(
  chalk.yellow(`
Opinionated chores tool "Chores" ❤️
`)
)

inquirer
  .prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Which Launguage do you use in this project?',
      choices: ['javascript', 'typescript'],
    },
    {
      type: 'checkbox',
      name: 'utils',
      message: 'Which utils do you want to setup?',
      choices: ['Semantic Release', 'Validate Commit Message'],
    },
  ])
  .then(res => {
    const { language, utils } = res
    // spinner = ora('Loading unicorns').start()
    setup(language, utils)
  })
