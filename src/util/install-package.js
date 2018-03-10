const { execSync, exec } = require('child_process')
const findRootProject = require('./find-project')

const projRootDir = findRootProject()

module.exports = installNodePackages

async function installNodePackages(packages) {
  // group by save mode
  const packageGroups = groupBy(packages, p => p.mode)

  for (let pg of packageGroups) {
    const { key, elems } = pg
    await installNodePackagesAtOnce(elems, key)
  }
}

function installNodePackagesAtOnce(packages, mode) {
  const cmd = `npm i ${mode} ${packages.map(p => p.name).join(' ')}`
  return execOnRoot(cmd)
}

function execOnRoot(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: projRootDir }, (err, stdout, stderr) => {
      if (err) reject(err)
      resolve(stdout)
    })
  })
}

function groupBy(elems, getKey) {
  const groupMap = {}

  elems.forEach(elem => {
    const group = groupMap[getKey(elem)]
    if (group) {
      group.push(elem)
    } else {
      groupMap[getKey(elem)] = [elem]
    }
  })

  const keys = Object.keys(groupMap)

  return keys.map(k => ({ key: k, elems: groupMap[k] }))
}
