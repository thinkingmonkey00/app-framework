// Writes input to file
// - file path relative to the project folder
// - if extension is json, text will be formatted nicely

// Import modules
import fs from 'fs-extra';
import path from 'path';
import log from './log';
import absPath from './path';
import type from './type';

// Export function
export default (file, input) => {
  try {
    // Get absolute path
    const filename = absPath(file);
    // Create path if needed
    fs.ensureDir(path.dirname(filename));
    // If json extension
    if (/\.json$/.test(filename)) {
      // Check input
      if (type(input) !== 'object') log.error('Expect input to be an object.');
      // Write to formatted json file
      return fs.writeJsonSync(filename, input, { spaces: 2 });
    // If no json extension
    }
    // Check input
    if (type(input) !== 'string') log.error('Expect input to be a string.');
    // Write to plain text file
    fs.writeFileSync(filename, input);
  } catch (err) {
    log.error(`Failed to write file "${file}".`);
  }
  return true;
};
