const { execSync } = require('child_process')

packages = [
  { name: 'commitizen' /* default value for key 'save': '--save-dev' */ },
  { name: 'cz-conventional-changelog' },
  { name: 'eslint' },
  { name: 'eslint-config-prettier' },
  { name: 'husky' },
  { name: 'lint-staged' },
  { name: 'prettier' },
  { name: 'semantic-release' },
  { name: 'validate-commit-msg' },
]

function installPackages(packages) {
  packages.forEach(package => {
    execSync(`npm install ${package.name} ${package.save ? package.save : '--save-dev'}`)
  })
}

installPackages(packages)
