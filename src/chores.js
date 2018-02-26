const { execSync } = require('child_process')
const path = require('path')

execSync(`node node_modules/chores/src/setup.js`)

console.info('removing node_modules/chores')
execSync(`rm -rf node_modules/chores`)
