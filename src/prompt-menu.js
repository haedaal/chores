const inquirer = require('inquirer')

module.exports = () =>
  inquirer.prompt([
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
