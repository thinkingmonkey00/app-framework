/**
 * Update scripts in package.json according files in script folder
 */

const fs = require('fs-extra');
const path = require('path');

const updateScripts = () => {
  // Read package.json file
  const packageInfo = fs.readJsonSync(path.resolve(__dirname, '../package.json'));
  // Read script files
  const scriptFiles = fs.readdirSync(__dirname);
  // Reset scripts in package info
  packageInfo.scripts = {};
  // Loop script files
  scriptFiles.forEach((file) => {
    // If JS file
    if (file.substr(-3) === '.js') {
      // Add to scripts
      const name = file.substr(0, file.length - 3);
      const command = `node -e "require('./scripts/${name}')()"`;
      packageInfo.scripts[name] = command;
    }
  });
  // Update package.json file
  fs.writeJsonSync(path.resolve(__dirname, '../package.json'), packageInfo, { spaces: 2 });
  // Log
  console.log('Updated scripts in "package.json" file');
};

module.exports = updateScripts;
