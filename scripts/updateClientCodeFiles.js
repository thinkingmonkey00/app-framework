// Purpose: Update client code files

// Import modules
const env = require('./env')
const fs = require('fs-extra')

// Update entry.js file
try {
  // Read file
  let entryJSContent = fs.readFileSync(env.path.client('entry.js'), { encoding: 'utf8' })
  // Update app component path
  entryJSContent = entryJSContent.replace(/import app from '(.*)'/, `import app from '${env.path.app('app.vue')}'`)
  // Update route file path
  entryJSContent = entryJSContent.replace(/import routes from '(.*)'/, `import routes from '${env.path.app('routes.js')}'`)
  // Write file
  fs.writeFileSync(env.path.client('entry.js'), entryJSContent)
  // Log progress
  env.log.progress('Updated client/entry.js file')
} catch (err) {
  env.log.issue('Failed to update client/entry.js file')
}

