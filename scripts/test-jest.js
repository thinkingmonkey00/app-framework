/**
 * Run Jest test and update coverage report
 */

// Import modules
const cp = require('child_process');

// Define function
const jest = () => {
  // Run Jest in sub process and update coverage report
  const command = 'node_modules/.bin/jest';
  const params = ['--config', 'scripts/helper/config-jest.js'];
  const options = { shell: true, stdio: 'inherit' };
  cp.spawn(command, params, options);
  // Result is logged by Jest directly
};

// Export function
module.exports = jest;
