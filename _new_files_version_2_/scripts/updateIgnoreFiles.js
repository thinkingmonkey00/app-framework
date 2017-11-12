// Purpose: Update .gitignore and .npmignore files bases on the scripts and app configuration

// Load modules
const env = require('./env')
const fs = require('fs-extra')

// Define function to update file
const updateFile = (type) => {
  // Check parameters
  if (type !== 'git' && type !== 'npm') env.log.issue('Type must be either "git" or "npm"')
  // Merge configurations
  const scriptConfig = env.cfg.scripts[`${type}ignore`]
  const appConfig = env.cfg.app[`${type}ignore`]
  // Create file content
  const fileContent = [
    '# This file is updated automatically',
    '# You can add rules in the configuration file',
    ''].concat(scriptConfig, appConfig).join('\n')
  // Create/update file
  fs.writeFileSync(env.path.proj(`.${type}ignore`), fileContent)
  // Log progress
  env.log.progress(`File .${type}ignore updated`)
}

// Run function
updateFile('git')
updateFile('npm')
