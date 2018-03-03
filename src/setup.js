const { execSync } = require('child_process')
const path = require('path')

const F = require('./util/F')

// conf files
const lintConf = require('./conf/lint.json')
const semanticRelease = require('./conf/semantic-release.json')
const validateCommitMsg = require('./conf/validate-commit-msg.json')

// functions
const extractUniqPackage = F.pipe(F.flattenArray, F.uniq)
const { installNodePackages } = require('./install')
const { configure } = require('./configure')
const cleanUp = require('./cleanup')
const ora = require('ora')

let spinner

// main
module.exports = function setup(language, utils) {
  const packageNames = extractUniqPackage([
    lintConf.default.packages,
    language === 'javascript' ? lintConf.javascript.packages : lintConf.typescript.packages,
    utils.includes('Semantic Release') ? semanticRelease.default.packages : [],
    utils.includes('Validate Commit Message') ? validateCommitMsg.default.packages : [],
  ])

  // install all packages with --save-dev
  const packages = packageNames.map(name => ({ name, mode: '--save-dev' }))

  spinner = ora().start('Installing Node modules')
  installNodePackages(packages).then(res => {
    spinner.succeed('Node Modules Installed')
  })

  // 3. configure package.json, etc.

  const configureFiles = F.flattenArray([
    lintConf.default.files,
    language === 'javascript' ? lintConf.javascript.files : lintConf.typescript.files,
    utils.includes('Semantic Release') ? semanticRelease.default.files : [],
    utils.includes('Validate Commit Message') ? validateCommitMsg.default.files : [],
  ])

  // configure(configureFiles)

  // 4. cleanup

  // cleanUp()
}
