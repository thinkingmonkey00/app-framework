// Runs ESLint code check and logs findings

// Import modules
import h from './helper';

// Define config
const config = {
  extends: ['airbnb-base', 'plugin:vue/essential'],
  env: { node: true, browser: true, jest: true },
  plugins: ['markdown'],
};

// Create config file in cache folder
const configFile = 'cache/test-eslint/config.json';
h.write(configFile, config);

// Define folders to check
const folders = [];
if (!h.isInstalled()) folders.push('docs', 'client', 'scripts');
if (h.isInstalled()) folders.push('app');

// Define commands
const commands = [
  'node_modules/.bin/eslint', ...folders,
  '--config', configFile,
  '--output-file', 'eslint.log',
  '--fix',
  '--max-warnings', 0,
  '--ext', '.js,.vue,.md',
];

// Run test
h.run(commands, (err) => {
  // If errors
  if (err) {
    // Log warning
    h.log.warning('ESLint found some errors. Please check file "eslint.log" for details.');
  // If no errors
  } else {
    // Remove eslint.log file
    h.remove('eslint.log');
    // Log success
    h.log.success('ESLint check passed without errors.');
  }
  // Remove temp folder
  h.remove('cache/test-eslint');
});
