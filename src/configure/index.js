const { mergeRightJson } = require('./json')

module.exports = configure

async function configure(files) {
  files.forEach(file => {
    switch (file.type) {
      case 'json': {
        // ignore strategy temporalily
        const { path, type, content } = file
        mergeRightJson(path, content)
        break
      }
      default: {
        console.warn(`${file.type} not supported`)
      }
    }
  })
}
