// Returns file content as string
// - file path relative to the project folder
// - if file extension is json, returns object

// Import modules
import fs from 'fs-extra';
import log from './log';
import path from './path';

// Export function
export default (file) => {
  try {
    // Get absolute path
    const absPath = path(file);
    // If json extension
    if (/\.json$/.test(absPath)) {
      // Load as json
      return fs.readJsonSync(absPath);
    // If no json extension
    }
    // Load as string
    fs.readFileSync(absPath, { encoding: 'utf8' });
  } catch (err) {
    log.error(`Failed to read file "${file}".`);
  }
  return true;
};
