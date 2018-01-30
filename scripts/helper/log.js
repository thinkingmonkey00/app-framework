// Logs formatted text to the console

// Import modules
import chalk from 'chalk';

// Define function
const log = (type, input) => {
  try {
    // Transform input to string
    const text = typeof input === 'string' ? input : JSON.stringify(input);
    // Define indicator
    let indicator;
    if (type === 'error') indicator = chalk.bold.red('ERROR   ');
    if (type === 'warning') indicator = chalk.bold.yellow('WARNING ');
    if (type === 'success') indicator = chalk.bold.green('SUCCESS ');
    if (type === 'info') indicator = chalk.bold.blue('INFO    ');
    if (type === 'debug') indicator = chalk.bold.magenta('DEBUG   ');
    // Define message
    const message = chalk.bold(text);
    // Define log text
    const string = (`${indicator} ${message}`).trim();
    // Log to the console
    console.log(string); // eslint-disable-line no-console
    // Exit script on error logs
    if (type === 'error') process.exit();
  } catch (err) {
    throw new Error('Something went wrong while logging.');
  }
};

// Export object with logging functions
export default {
  error: input => log('error', input),
  warning: input => log('warning', input),
  success: input => log('success', input),
  info: input => log('info', input),
  debug: input => log('debug', input),
};
