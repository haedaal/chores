const { installNodePackages } = require('./install')
const { configure } = require('./configure')

const packageNames = [
  'commitizen',
  'cz-conventional-changelog',
  'eslint',
  'eslint-config-prettier',
  'husky',
  'lint-staged',
  'prettier',
  'semantic-release',
  'validate-commit-msg',
]

// install all packages with --save-dev
const packages = packageNames.map(name => ({ name, mode: '--save-dev' }))

installNodePackages(packages)

configure()
