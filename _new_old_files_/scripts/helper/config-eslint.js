/**
 * Return ESLint configuration as JSON
 */

// Start config object
const config = {};

// Define set of rules
config.extends = ['airbnb-base', 'plugin:vue/essential'];

// Define environment variables
config.env = { node: true, browser: true, jest: true };

// Export config
module.exports = config;
