// run this script on root directory

console.info('Starting clean-up process')

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function cleanUp() {
  const rootPath = process.env.PWD

  // pakcage.json
  try {
    const file = path.join(rootPath, 'package.json')
    const json = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (json.dependencies && json.dependencies.chores) {
      delete json.dependencies.chores
    }
    if (json.devDependencies && json.devDependencies.chores) {
      delete json.devDependencies.chores
    }

    fs.writeFileSync(file, JSON.stringify(json, null, 2))
  } catch (e) {
    console.error(e)
    console.error(
      'Failed to remove chores from package.json\nRemove chores setting manually or it will be triggered every npm install or update'
    )
  }

  // pakcage-lock.json
  try {
    const file = path.join(rootPath, 'package-lock.json')
    const json = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (json.dependencies && json.dependencies.chores) {
      delete json.dependencies.chores
    }

    fs.writeFileSync(file, JSON.stringify(json, null, 2))
  } catch (e) {
    console.error(e)
    console.error(
      'Failed to remove chores from package-lock.json\nRemove chores setting manually or it will be triggered every npm install or update'
    )
  }
}

module.exports = cleanUp
