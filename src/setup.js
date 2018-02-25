const { execSync } = require('child_process')
const { installNodePackages } = require('./install')
const { configure } = require('./configure')

const lintConf = require('./conf/lint.json')
const semanticRelease = require('./conf/semantic-release.json')
const validateCommitMsg = require('./conf/validate-commit-msg.json')

const F = require('./util/F')

const extractUniqPackage = F.pipe(F.flattenArray, F.uniq)

// run prompt to get project info

const packageNames = extractUniqPackage([
  lintConf.default.packages,
  lintConf.javascript.packages,
  semanticRelease.default.packages,
  validateCommitMsg.default.packages,
])

// console.log(packageNames)

// install all packages with --save-dev
const packages = packageNames.map(name => ({ name, mode: '--save-dev' }))

installNodePackages(packages)

const configureFiles = F.flattenArray([
  lintConf.default.files,
  lintConf.javascript.files,
  semanticRelease.default.files,
  validateCommitMsg.default.files,
])

configure(configureFiles)

// cleanup
execSync(`rm -rf node_modules/chores`, { cwd: process.env.INIT_CWD })

console.log('need to cleanup to prevent running every updates, etc.\n rm -rf node_modules/chores')
