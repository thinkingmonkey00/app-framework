// Purpose: Run ESLint to fix the code, log remaining errors to file eslint.log

// Load modules
const env = require('./env')
const { spawn } = require('child_process')
const fs = require('fs-extra')

// Log progress
env.log.progress('ESLint is running - please wait ...')

// Define bin file
const params = [env.path.bin('eslint')]

// Add folder to check
params.push(env.path.app())
if (!env.isInstalled) {
  params.push(env.path.client())
  params.push(env.path.scripts())
}

// Fix code automatically
params.push('--fix')

// Log to file
const logFile = env.path.proj('eslint.log')
params.push('--output-file')
params.push(logFile)

// Run ESLint
const cmd = spawn(params.shift(), params)

// Act on ESLint processs has finished
cmd.on('close', (statusCode) => {
  // If errors found, show error message and exit script
  if (statusCode === 1) env.log.error('ESLint found some unconformities, please check the file eslint.log')
  // Else, delete log file
  fs.removeSync(logFile)
  // Show progress
  env.log.progress('ESLint code fix done')
})
