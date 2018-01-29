import path from 'path';
import isInstalled from './isInstalled';

export default (...args) => {
  const projectPath = path.resolve(__dirname, '../../', isInstalled() ? '../../' : '');
  return path.resolve(projectPath, ...args);
};
