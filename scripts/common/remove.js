import fs from 'fs-extra';
import absPath from './path';

export default (path) => {
  try {
    fs.removeSync(absPath(path));
    return true;
  } catch (err) {
    return false;
  }
};
