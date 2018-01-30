// Run all tests in order

// Import modules
import path from 'path';
import h from './helper';

// Function to run scripts
const runScripts = (scripts) => {
  // Tests not empty
  if (scripts.length > 0) {
    const nodeModules = h.isInstalled() ? path.resolve(__dirname, '../') : h.path('node_modules');
    h.run([`${nodeModules}/.bin/babel-node`, `scripts/${scripts.shift()}`], true, () => {
      runScripts(scripts);
    });
  }
};

// Run scripts
runScripts([
  'test-engines',
  'test-eslint',
]);
