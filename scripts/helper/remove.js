// Removes folder or file
// - relative to the project folder

// Import modules
import fs from 'fs-extra';
import log from './log';
import absPath from './path';

// Export function
export default (path) => {
  try {
    fs.removeSync(absPath(path));
  } catch (err) {
    log.error(`Failed to remove "${path}"`);
  }
};
