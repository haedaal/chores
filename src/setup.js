const { execSync } = require('child_process')
const path = require('path')

// fp utils
const F = require('./util/F')

/**
 * CAUTION
 * This file will be copied to the rootDir of another project
 * and will be run there
 */
// const chores_base_dir = './node_modules/chores/src'

// load configurations
const lintConf = require('./conf/lint.json')
const semanticRelease = require('./conf/semantic-release.json')
const validateCommitMsg = require('./conf/validate-commit-msg.json')

console.log('Starting chores...')

// TODO: 1. Prompt to get project info

// 2. setup
const { installNodePackages } = require('./install')

const extractUniqPackage = F.pipe(F.flattenArray, F.uniq)

const packageNames = extractUniqPackage([
  lintConf.default.packages,
  lintConf.javascript.packages,
  semanticRelease.default.packages,
  validateCommitMsg.default.packages,
])

// install all packages with --save-dev
const packages = packageNames.map(name => ({ name, mode: '--save-dev' }))

installNodePackages(packages)

// 3. configure package.json, etc.
const { configure } = require('./configure')

const configureFiles = F.flattenArray([
  lintConf.default.files,
  lintConf.javascript.files,
  semanticRelease.default.files,
  validateCommitMsg.default.files,
])

configure(configureFiles)

// 4. cleanup

const cleanUp = require('./cleanup')

cleanUp()
