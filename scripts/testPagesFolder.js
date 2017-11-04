// Purpose: Check app/pages folder if it contains only .vue files

// Include modules
const env = require('./env')
const rread = require('readdir-recursive')

// Read files in pages folder
const files = rread.fileSync(env.path.app('pages'))

// Get wrong files
const wrongFiles = []
files.forEach((file) => {
  // Get path relative to pages folder
  const path = file.substr(env.path.app('pages').length + 1)
  // Add to wrong files if the extension is not .vue
  if (path.match(/^([0-9a-zA-Z_-]|\/)+\.vue$/) === null) wrongFiles.push(path)
})

// Show error message if wrong files found
if (wrongFiles.length > 0) {
  env.log.error(`These page files are not compliant to the requested format "[a-zA-Z0-9_-].vue"\n- ${wrongFiles.join('\n- ')}`)
}

// Show progress
env.log.progress('Folder app/pages checked')
