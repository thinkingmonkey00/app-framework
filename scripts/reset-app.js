// Resets app folder

// Import modules
import fs from 'fs-extra';
import path from 'path';
import h from './helper';

// App folder already exists
if (h.exists('app')) {
  h.log.warn('App folder already exists.');
// App folder does not exist
} else {
  // Copy app template folder
  try {
    fs.copySync(path.resolve(__dirname, '../app-template'), h.path('app'));
    h.log.success('App folder created successfully.');
  } catch (err) {
    h.log.error('App folder creation failed.');
  }
}
