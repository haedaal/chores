const { execSync } = require('child_process')
const { installNodePackages } = require('./install')
const { configure } = require('./configure')
const path = require('path')

const lintConf = require('./conf/lint.json')
const semanticRelease = require('./conf/semantic-release.json')
const validateCommitMsg = require('./conf/validate-commit-msg.json')

const F = require('./util/F')

const extractUniqPackage = F.pipe(F.flattenArray, F.uniq)

// TODO: run prompt to get project info

const packageNames = extractUniqPackage([
  lintConf.default.packages,
  lintConf.javascript.packages,
  semanticRelease.default.packages,
  validateCommitMsg.default.packages,
])

// install all packages with --save-dev
const packages = packageNames.map(name => ({ name, mode: '--save-dev' }))

installNodePackages(packages)

// configure package.json, etc.
const configureFiles = F.flattenArray([
  lintConf.default.files,
  lintConf.javascript.files,
  semanticRelease.default.files,
  validateCommitMsg.default.files,
])

configure(configureFiles)

// copy cleanUp script to project root
const originPath = path.join(process.env.PWD, 'cleanup.js')
const targetPath = path.join(process.env.INIT_CWD, 'cleanup.js')
execSync(`cp ${originPath} ${targetPath}`)
console.info(
  `
  ##################################################################################
  [NOTICE] Run generated cleanup script with "node cleanup.js" on project root dir
  Or chores will be run every "npm install" or "npm update"
  ##################################################################################
  `
)
