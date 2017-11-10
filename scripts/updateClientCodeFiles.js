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

// Update mixins/loadAppConfiguration.js file
try {
  // Read file
  let content = fs.readFileSync(env.path.client('mixins/loadAppConfiguration.js'), { encoding: 'utf8' })
  // Update app Config path
  const path = env.rel(env.path.client('mixins'), env.path.app('config.json'))
  content = content.replace(/import appConfig from '(.*)'/, `import appConfig from '${path}'`)
  // Write file
  fs.writeFileSync(env.path.client('mixins/loadAppConfiguration.js'), content)
  // Log progress
  env.log.progress('Updated mixins/loadAppConfiguration.js file')
} catch (err) {
  env.log.issue('Failed to update mixins/loadAppConfiguration.js file')
}

