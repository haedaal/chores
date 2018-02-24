const { execSync } = require('child_process')

function execSyncOnRoot(cmd) {
  return execSync(cmd, { cwd: process.env.INIT_CWD })
}

function installNodePackages(packages) {
  // group by save mode
  const packageGroups = groupBy(packages, p => p.mode)

  packageGroups.forEach(pg => {
    const { key, elems } = pg
    installNodePackagesAtOnce(elems, key)
  })
}

function installNodePackagesAtOnce(packages, mode) {
  const cmd = `npm i ${mode} ${packages.map(p => p.name).join(' ')}`
  console.info('running cmd:', cmd)
  const buffer = execSyncOnRoot(cmd)
  console.log(buffer.toString())
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

module.exports = {
  installNodePackages,
}
