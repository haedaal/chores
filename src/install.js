const { execSync } = require('child_process')

function execSyncOnRoot(cmd) {
  return execSync(cmd, { cwd: process.env.INIT_CWD })
}

function installNodePackages(packages) {
  packages.forEach(p => {
    const cmd = `npm install ${p.name} ${p.save ? p.save : '--save-dev'}`
    const buffer = execSyncOnRoot(cmd)
    console.log(buffer.toString())
  })
}

module.exports = {
  installNodePackages,
}
