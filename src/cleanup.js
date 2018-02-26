const { execSync } = require('child_process')

function cleanUp() {
  execSync(`rm -rf node_modules/chores`, { cwd: process.env.INIT_CWD })

  try {
    const packageJsonPath = path.join(process.env.INIT_CWD, './package.json')
    const packageJson = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (packageJson.dependencies && packageJson.dependencies.chores) {
      delete packageJson.dependencies.chores
    }
    if (packageJson.devDependencies && packageJson.devDependencies.chores) {
      delete packageJson.devDependencies.chores
    }

    json = mergeDeepRight(json, content)
    fs.writeFileSync(file, JSON.stringify(json, null, 2))
  } catch (e) {
    console.error(e)
    console.error(
      'Failed to remove chores from package.json\nRemove chores setting manually or it will be triggered every npm install or update'
    )
  }

  try {
    const packageJsonPath = path.join(process.env.INIT_CWD, './package-lock.json')
    const packageJson = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (packageJson.dependencies && packageJson.dependencies.chores) {
      delete packageJson.dependencies.chores
    }
    json = mergeDeepRight(json, content)
    fs.writeFileSync(file, JSON.stringify(json, null, 2))
  } catch (e) {
    console.error(e)
    console.error(
      'Failed to remove chores from package-lock.json\nRemove chores setting manually or it will be triggered every npm install or update'
    )
  }
}

module.exports = cleanUp
