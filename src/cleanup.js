const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function cleanUp() {
  execSync(`rm -rf node_modules/chores`, { cwd: process.env.INIT_CWD })

  // pakcage.json
  try {
    const file = path.join(process.env.INIT_CWD, './package.json')
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
    const file = path.join(process.env.INIT_CWD, './package-lock.json')
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
