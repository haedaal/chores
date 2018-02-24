const fs = require('fs')
const path = require('path')

const conf = require('./package.overwrite.json')

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
