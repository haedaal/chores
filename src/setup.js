// util
const F = require('./util/F')

// gui util
const ora = require('ora')
let spinner

// conf files
const lintConf = require('./conf/lint.json')
const semanticRelease = require('./conf/semantic-release.json')
const validateCommitMsg = require('./conf/validate-commit-msg.json')

// setup processes
const extractUniqPackage = F.pipe(F.flattenArray, F.uniq)
const installNodePackages = require('./util/install-package')
const configure = require('./configure')

// main
module.exports = async function setup(language, utils) {
  const packageNames = extractUniqPackage([
    lintConf.default.packages,
    language === 'javascript' ? lintConf.javascript.packages : lintConf.typescript.packages,
    utils.includes('Semantic Release') ? semanticRelease.default.packages : [],
    utils.includes('Validate Commit Message') ? validateCommitMsg.default.packages : [],
  ])

  // install all packages with --save-dev
  const devPackages = packageNames.map(name => ({ name, mode: '--save-dev' }))

  spinner = ora().start('Installing Node modules')

  // run async, or ora spinner freeze
  await installNodePackages(devPackages)

  spinner.succeed('Node Modules Installed')

  // 3. configure package.json, etc.

  const configureFiles = F.flattenArray([
    lintConf.default.files,
    language === 'javascript' ? lintConf.javascript.files : lintConf.typescript.files,
    utils.includes('Semantic Release') ? semanticRelease.default.files : [],
    utils.includes('Validate Commit Message') ? validateCommitMsg.default.files : [],
  ])

  spinner = ora().start('Configuring Files')

  await configure(configureFiles)

  spinner.succeed('Files Configured')
}
