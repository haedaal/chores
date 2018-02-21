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

function execSyncOnRoot(cmd) {
  return execSync(cmd, { cwd: process.env.INIT_CWD })
}

function installPackages(packages) {
  packages.forEach(package => {
    const cmd = `npm install ${package.name} ${package.save ? package.save : '--save-dev'}`
    const buffer = execSyncOnRoot(cmd)
    console.log(buffer)
  })
}

installPackages(packages)
