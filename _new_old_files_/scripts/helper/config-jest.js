/**
 * Return Jest configuration as JSON
 */

// Import modules
const path = require('path');

// Start config object
const config = {};

// Set root directory
config.rootDir = path.resolve(__dirname, '../../');

// Define folders to test
config.roots = ['scripts'];

// Define RegExp to find test files
config.testRegex = '.spec.js$';

// Reset ignored patterns
config.testPathIgnorePatterns = [];

// Activate coverage report
config.collectCoverage = true;
config.coverageReporters = ['lcov', 'text'];
config.coverageDirectory = path.resolve(__dirname, '../../coverage');
config.collectCoverageFrom = ['**/*.js'];

// Export config
module.exports = config;
