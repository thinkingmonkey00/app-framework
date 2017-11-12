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

// Step: Update Cordova config and save to config.xml file
const updateConfig = () => new Promise((resolve, reject) => {
  const newConfig = {}
  // Add xml root element "widget" with app id and package
  newConfig.widget = {
    $: {
      id: env.cfg.app.appId,
      version: env.cfg.pkg.version,
      xmlns: 'http://www.w3.org/ns/widgets',
      'xmlns:cdv': 'http://cordova.apache.org/ns/1.0',
    },
  }
  // Add name
  newConfig.widget.name = [{ _: env.cfg.app.appName }]
  // Add short name
  if (env.cfg.app.appShortName !== '') {
    newConfig.widget.name.push({
      $: {
        short: 'HiCdv',
      },
      _: env.cfg.app.appShortName,
    })
  }
  // Add description
  if (env.cfg.pkg.description) newConfig.widget.description = env.cfg.pkg.description
  // Add author (extract before from package.json author field)
  if (env.cfg.pkg.author) {
    // Author is an object
    if (env.type(env.cfg.pkg.author) === 'object' && env.cfg.pkg.author.name) {
      const author = { _: env.cfg.pkg.author.name }
      if (env.cfg.pkg.author.email || env.cfg.pkg.author.url) author.$ = {}
      if (env.cfg.pkg.author.email) author.$.email = env.cfg.pkg.author.email
      if (env.cfg.pkg.author.url) author.$.href = env.cfg.pkg.author.url
      newConfig.widget.author = author
    // Author is a string
    } else if (env.type(env.cfg.pkg.author) === 'string') {
      const name = env.cfg.pkg.author.replace(/<(.+)>/, '').replace(/\((.+)\)/, '').trim()
      const email = env.cfg.pkg.author.match(/<(.+)>/) ? env.cfg.pkg.author.match(/<(.+)>/)[1].trim() : null
      const href = env.cfg.pkg.author.match(/\((.+)\)/) ? env.cfg.pkg.author.match(/\((.+)\)/)[1].trim() : null
      if (name !== '') {
        newConfig.widget.author = { _: name }
        if (email || href) newConfig.widget.author.$ = {}
        if (email) newConfig.widget.author.$.email = email
        if (href) newConfig.widget.author.$.href = href
      }
    }
  }
  // Define decoder options
  const opts = {
    xmldec: {
      version: '1.0',
      encoding: 'utf-8',
    },
    renderOpts: {
      pretty: true,
    },
  }
  // Build XML string
  const xmlStr = new xml.Builder(opts).buildObject(newConfig)
  // Write to config.xml file
  fs.writeFile(cordovaConfigFile, xmlStr, (err) => {
    if (err) reject(new Error('Failed to update Cordova config.xml file'))
    // Report progress and resolve promise
    env.log.progress('Updated Cordova config.xml file')
    resolve()
  })
})

// Run steps
getCurrentConfig()
  .then(updateConfig)
  .catch((err) => {
    env.log.issue(err.message)
  })
