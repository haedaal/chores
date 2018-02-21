const fs = require('fs')
const path = require('path')

const conf = {
  version: '0.0.0-development',
  scripts: {
    commit: 'git-cz',
    commitmsg: 'validate-commit-msg',
    precommit: 'lint-staged',
    prettier: "prettier --config .prettierrc.json --write './**/*.{js,json,ts,css,md,scss}'",
    'semantic-release-local': 'semantic-release --no-ci',
    'semantic-release': 'semantic-release',
  },
  'lint-staged': {
    '**/*.{js,json,css,scss,md,ts}': ['prettier --write', 'git add'],
  },
  release: {
    verifyConditions: [
      '@semantic-release/changelog',
      '@semantic-release/npm',
      '@semantic-release/github',
    ],
    publish: ['@semantic-release/changelog', '@semantic-release/npm', '@semantic-release/github'],
  },
  config: {
    commitizen: {
      path: './node_modules/cz-conventional-changelog',
    },
  },
}

function mutatingMergeDeepRight(left, right) {
  Object.keys(right).forEach(k => {
    const lv = left[k]
    const rv = right[k]
    if (typeof rv === 'object' && typeof lv === 'object') {
      left[k] = mutatingMergeDeepRight(lv, rv)
    } else {
      left[k] = rv
    }
  })

  return left
}

function mergeDeepRight(left, right) {
  const res = {}
  Object.keys(left).forEach(k => {
    res[k] = left[k]
  })

  return mutatingMergeDeepRight(res, right)
}

function configure() {
  const file = path.join(process.env.INIT_CWD, 'package.json')
  let json = JSON.parse(fs.readFileSync(file, 'utf8'))
  json = mergeDeepRight(json, conf)
  fs.writeFileSync(file, JSON.stringify(json, null, 2))
}

module.exports = {
  configure,
}
