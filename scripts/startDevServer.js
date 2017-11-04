// Purpose: Start Webpack Development Server

// Include modules
const env = require('./env')
const { spawn } = require('child_process')

// Define paths
const binFile = env.path.bin('webpack-dev-server')
const webpackConfigFile = env.path.scripts('config.webpack')

// Log progress
env.log.progress('Webpack Dev Server is starting - please wait ...')

// Spawn child process
const process = spawn(binFile, ['--config', webpackConfigFile])

// Log child process output
process.stdout.on('data', (txt) => {
  env.log.progress(`${txt}`)
})
process.stderr.on('data', (txt) => {
  env.log.warning(`${txt}`)
})

// Log error if Webpack Dev Server closes with an error
process.on('close', (statusCode) => {
  if (statusCode === 1) env.log.error('Webpack Dev Server has encountered an error')
})
