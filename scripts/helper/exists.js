// Returns true if path exists, else false
// - relative to project folder

// Import modules
import fs from 'fs';
import absPath from './path';

// Export function
export default path => fs.existsSync(absPath(path));
