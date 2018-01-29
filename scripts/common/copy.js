import fs from 'fs-extra';
import absPath from './path';

export default (source, destination) => {
  try {
    fs.copySync(absPath(source), absPath(destination));
    return true;
  } catch (err) {
    return false;
  }
};
