const { installNodePackages } = require('./install')
const { configure } = require('./configure')

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

installNodePackages(packages)

configure()
