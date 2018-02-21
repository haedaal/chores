function execSyncOnRoot(cmd) {
  return execSync(cmd, { cwd: process.env.INIT_CWD })
}

function installNodePackages(packages) {
  packages.forEach(package => {
    const cmd = `npm install ${package.name} ${package.save ? package.save : '--save-dev'}`
    const buffer = execSyncOnRoot(cmd)
    console.log(buffer)
  })
}

module.exports = {
  installNodePackages,
}
