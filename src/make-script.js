const path = require('path')
const { execSync } = require('child_process')

const notice = `
##################################################################################
# [NOTICE] Run generated chores script with "node chores.js" on project root dir #
##################################################################################
`

try {
  const originPath = path.join(process.env.PWD, 'src', 'chores.js')
  const targetPath = path.join(process.env.INIT_CWD, 'chores.js')
  execSync(`cp ${originPath} ${targetPath}`)

  console.info(notice)
} catch (e) {
  console.error(e)
}
