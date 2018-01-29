/**
 * Run all update scripts in order
 */

// Import modules
const cp = require('child_process');

// Create function
const test = () => {
  const command = 'npm run update-scripts';
  const params = [];
  const options = { shell: true, stdio: 'inherit' };
  cp.spawn(command, params, options);
};

// Export function
module.exports = test;
