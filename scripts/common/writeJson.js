import path from 'path';
import fs from 'fs-extra';
import absPath from './path';

export default (file, json) => {
  try {
    fs.ensureDirSync(path.dirname(file));
    fs.writeJsonSync(absPath(file), json, { spaces: 2 });
    return true;
  } catch (e) {
    return false;
  }
};
