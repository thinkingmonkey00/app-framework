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
const cmd = spawn(binFile, ['--config', webpackConfigFile, '--disableHostCheck'])

// Log child process output and start browser once
let browserStarted = false
cmd.stdout.on('data', (txt) => {
  env.log.progress(`${txt}`)
  if (!browserStarted && `${txt}`.match(/Compiled successfully/)) {
    browserStarted = true
    const host = process.env.IP || 'localhost'
    const port = process.env.PORT || env.cfg.app.devServerPort
    open(`http://${host}:${port}`)
  }
})
cmd.stderr.on('data', (txt) => {
  env.log.warning(`${txt}`)
})

// Log error if Webpack Dev Server closes with an error
cmd.on('close', (statusCode) => {
  if (statusCode === 1) env.log.error('Webpack Dev Server has encountered an error')
})
