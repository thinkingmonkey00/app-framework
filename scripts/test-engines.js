// Test if required engines in package.json are met

// Import modules
import fs from 'fs-extra';
import path from 'path';
import semver from 'semver';
import h from './helper';

// Function to check set of engines
const checkEngines = (engines) => {
  // Next engine
  const engine = engines.shift();
  // Get engine
  h.run([engine.name, '-v'], (err, data) => {
    // Check version
    const versionOK = semver.satisfies(data, engine.version);
    if (!versionOK) h.log.error(`Expected ${engine.name} to satisfy ${engine.version} (is ${data})`);
    // If more engines in array
    if (engines.length > 0) {
      // Compare other engines
      checkEngines(engines);
    // If not more engines in engines in array
    } else {
      // Successfull log
      h.log.success('Engine comparison successfull.');
    }
  });
};

// Load engines from package.json
const { engines } = fs.readJsonSync(path.resolve(__dirname, '../package.json'));
if (h.type(engines) !== 'object') h.log.error('Expect engines to be an object.');

// Create array with engines
const enginesArray = [];
Object.keys(engines).forEach((eng) => {
  enginesArray.push({ name: eng, version: engines[eng] });
});

// Check all engines in array
checkEngines(enginesArray);
