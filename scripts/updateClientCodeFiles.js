// Purpose: Update client code files

// Import modules
const env = require('./env')
const fs = require('fs-extra')

// Update entry.js file
try {
  // Read file
  let entryJSContent = fs.readFileSync(env.path.client('entry.js'), { encoding: 'utf8' })
  // Update app component path
  const appCompPath = env.rel(env.path.scripts(), env.path.app('app.vue'))
  entryJSContent = entryJSContent.replace(/import app from '(.*)'/, `import app from '${appCompPath}'`)
  // Update route file path
  const routesPath = env.rel(env.path.scripts(), env.path.app('routes'))
  entryJSContent = entryJSContent.replace(/import routes from '(.*)'/, `import routes from '${routesPath}'`)
  // Write file
  fs.writeFileSync(env.path.client('entry.js'), entryJSContent)
  // Log progress
  env.log.progress('Updated client/entry.js file')
} catch (err) {
  env.log.issue('Failed to update client/entry.js file')
}

