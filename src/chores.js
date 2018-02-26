/**
 * CAUTION
 * This file will be copied to & run in root directory of containing project
 */

const { execSync } = require('child_process')
const { unlinkSync } = require('fs')
const path = require('path')

execSync(`node node_modules/chores/src/setup.js`)

console.info('removing node_modules/chores')
execSync(`rm -rf node_modules/chores`)

// remove self
unlinkSync('./chores.js')
