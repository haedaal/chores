const fs = require('fs')
const path = require('path')

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

function mergeRightJson(filePath, content) {
  const file = path.join(process.env.PWD, filePath)
  let json
  try {
    json = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (e) {
    json = {}
  }
  json = mergeDeepRight(json, content)
  fs.writeFileSync(file, JSON.stringify(json, null, 2))
}

function configure(files) {
  // console.log('files', files)
  files.forEach(file => {
    switch (file.type) {
      case 'json': {
        // ignore strategy temporalily
        const { path, type, content } = file
        mergeRightJson(path, content)
        break
      }
      default: {
        console.warn(`${file.type} not supported`)
      }
    }
  })
}

module.exports = {
  configure,
}
