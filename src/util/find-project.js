const path = require('path')
const fs = require('fs')

module.exports = function findProjectRoot() {
  let segs = process.env.PWD.split(path.sep)

  while (!fs.existsSync(path.join(segs.join(path.sep), 'package.json'))) {
    segs.pop()
  }

  const root = segs.join(path.sep)
  return root
}
