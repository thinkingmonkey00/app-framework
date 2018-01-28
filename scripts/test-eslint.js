/**
 * Run ESLint test and log result to eslint.log file
 */

// Import modules
const cp = require('child_process');
const fs = require('fs-extra');

// Define function
const eslint = () => {
  // Run ESLint in sub process and log result to eslint.log file
  const command = 'node_modules/.bin/eslint scripts';
  const params = ['--config', 'scripts/helper/config-eslint.js', '>', 'eslint.log', '--fix'];
  const options = { shell: true, stdio: 'inherit' };
  const subProcess = cp.spawn(command, params, options);
  // Act on sub process closure
  subProcess.on('close', (code) => {
    // If sub process was closed without error
    if (code === 0) {
      // Remove log file
      fs.remove('eslint.log');
      // Log success
      console.log('ESLint test passed without errors');
    // If sub process was closes with error(s)
    } else {
      // Ask user to check eslint.log file
      console.log('ESLint test found some errors. Please check the file "eslint.log"');
    }
  });
};

// Export function
module.exports = eslint;
