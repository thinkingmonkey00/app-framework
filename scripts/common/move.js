import fs from 'fs-extra';
import absPath from './path';

export default (source, destination) => {
  try {
    fs.moveSync(absPath(source), absPath(destination), { overwrite: true });
    return true;
  } catch (err) {
    return false;
  }
};
