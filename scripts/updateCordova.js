// Purpose: Update Cordova plugins and config.xml file according the scripts and app configuration

// Import modules
const env = require('./env')
const fs = require('fs-extra')
const xml = require('xml2js')

// Define Cordova bin folder
// As Cordova is installed locally, config.xml file must be located there
const cordovaConfigFile = env.path.npm('cordova/bin/config.xml')

// Step: Get current Cordova config as JSON
const getCurrentConfig = () => new Promise((resolve, reject) => {
  // Check if the config.xml file exists
  fs.pathExists(cordovaConfigFile, (existsErr, exists) => {
    if (existsErr) reject(new Error('Failed to check the Cordova config.xml file'))
    // If config.xml file exists
    if (exists) {
      // Read config.xml file content
      fs.readFile(cordovaConfigFile, { encoding: 'utf8' }, (readErr, content) => {
        if (readErr) reject(new Error('Failed to read the Cordova config.xml file'))
        // Parse the XML content string to JSON
        xml.parseString(content, (parseErr, json) => {
          if (parseErr) reject(new Error('Failed to parse the Cordova config.xml file content'))
          // Log progress
          env.log.progress('Parsed current Cordova configuration file')
          // Return JSON
          resolve(json)
        })
      })
    // If config.xml file not exists
    } else {
      // Log progress
      env.log.progress('Created new Cordova configuration object')
      // Return empty object
      resolve({})
    }
  })
})

// Step: Complete configuration with basic data
const addBasicData = currentConfig => new Promise((resolve) => {
  env.log.debug('should not log')
  const oldConfig = currentConfig
  return resolve(oldConfig)
})

// Run steps
getCurrentConfig()
  .then(addBasicData)
  .then((cfg) => {
    env.log.progress(cfg)
  })
  .catch((err) => {
    env.log.issue(err.message)
  })
