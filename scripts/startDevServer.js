// Purpose: Start Webpack Development Server

// Include modules
const env = require('./env')
const { spawn } = require('child_process')
const open = require('open')

// Define paths
const binFile = env.path.bin('webpack-dev-server')
const webpackConfigFile = env.path.scripts('config.webpack')

// Log progress
env.log.progress('Webpack Dev Server is starting - please wait ...')

// Spawn child process
const process = spawn(binFile, ['--config', webpackConfigFile])

// Log child process output and start browser once
let browserStarted = false
process.stdout.on('data', (txt) => {
  env.log.progress(`${txt}`)
  if (!browserStarted && `${txt}`.match(/Compiled successfully/)) {
    browserStarted = true
    open(`http://localhost:${env.cfg.app.devServerPort}`)
  }
})
process.stderr.on('data', (txt) => {
  env.log.warning(`${txt}`)
})

// Log error if Webpack Dev Server closes with an error
process.on('close', (statusCode) => {
  if (statusCode === 1) env.log.error('Webpack Dev Server has encountered an error')
})
