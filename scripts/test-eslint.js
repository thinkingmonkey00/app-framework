/**
 * Run ESLint and log findings
 */

// Import modules
import com from './common';

// Define config
const config = {
  extends: ['airbnb-base', 'plugin:vue/essential'],
  env: { node: true, browser: true, jest: true },
};

// Update config.json in temp folder
const configFile = '.temp/test-eslint/config.json';
if (!com.writeJson(configFile, config)) com.log.error('Failed to update the ESLint config file');

// Define folders to check
const folders = [];
if (!com.isInstalled()) folders.push('scripts');

// Run test
com.run(['node_modules/.bin/eslint', ...folders, '--config', configFile, '--output-file', 'eslint.log', '--fix', '--max-warnings', 0], (err) => {
  if (err) {
    com.log.warning('ESLint found some errors. Please check file "eslint.log" for details.');
  } else {
    if (!com.remove('eslint.log')) com.log.warning('Failed to remove the eslint.log file');
    com.log.success('ESLint check passed without errors.');
  }
  if (!com.remove('.temp/test-eslint')) com.log.error('Failed to remove the temp folder');
});
