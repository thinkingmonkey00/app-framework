// Purpose: Update scripts if App Framework is installed as a module

// Import modules
const env = require('./env')
const fs = require('fs-extra')
const _ = require('lodash')

// App Framework is installed as a module
if (env.isInstalled) {
  // Read package.json file
  fs.readJson(env.path.proj('package.json'), (errReadProj, projConfig) => {
    if (errReadProj) env.log.issue('Failed to read the project package.json file')
    // Read the App Framework package.json file
    fs.readJson(env.path.pkg('package.json'), (errReadPkg, pkgConfig) => {
      if (errReadPkg) env.log.issue('Failed to read the App Framework package.json file')
      // Create list of new scripts
      const newScripts = {}
      // Loop App Framework scripts
      _.forEach(pkgConfig.scripts, (command, name) => {
        // Script should be copied
        if (name !== 'postinstall') {
          // Translate the scripts command
          let newCommand = command
          newCommand = newCommand.replace(/node scripts/g, 'node node_modules/app-framework/scripts')
          // Add to new scripts
          newScripts[name] = newCommand
        }
      })
      // Add to project config
      const newProjConfig = projConfig
      newProjConfig.scripts = newScripts
      // Write new project config
      fs.writeJson(env.path.proj('package.json'), newProjConfig, { spaces: 2 }, (errWriteProj) => {
        if (errWriteProj) env.log.issue('Failed to update the project package.json file')
        // Log progress
        env.log.progress('Scripts updated')
      })
    })
  })
}
