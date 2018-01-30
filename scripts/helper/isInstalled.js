// Returns true if App Framework is installed as a Node module, else false

// Import modules
import fs from 'fs';
import path from 'path';

// Export function
export default () => fs.existsSync(path.resolve(__dirname, '../../../../package.json'));
