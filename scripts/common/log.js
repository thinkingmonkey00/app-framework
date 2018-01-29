import chalk from 'chalk';

const log = (type, input) => {
  try {
    const text = typeof input === 'string' ? input : JSON.stringify(input);
    let indicator;
    if (type === 'error') indicator = chalk.bold.red('ERROR   ');
    if (type === 'warning') indicator = chalk.bold.yellow('WARNING ');
    if (type === 'success') indicator = chalk.bold.green('SUCCESS ');
    if (type === 'info') indicator = chalk.bold.blue('INFO    ');
    if (type === 'debug') indicator = chalk.bold.magenta('DEBUG   ');
    const message = chalk.bold(text);
    const string = (`${indicator} ${message}`).trim();
    console.log(string); // eslint-disable-line no-console
    if (type === 'error') process.exit();
  } catch (err) {
    throw new Error('Something went wrong while logging ...');
  }
};

export default {
  error: input => log('error', input),
  warning: input => log('warning', input),
  success: input => log('success', input),
  info: input => log('info', input),
  debug: input => log('debug', input),
};
