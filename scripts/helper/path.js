// Returns absolute path, relative to the project folder
// - accepts one or multiple arguments like path.resolve(...)

// Import modules
import path from 'path';
import isInstalled from './isInstalled';

// Export function
export default (...args) => {
  // Define project path
  const projectPath = path.resolve(__dirname, '../../', isInstalled() ? '../../' : '');
  // Return absolute path, relative to the project path
  return path.resolve(projectPath, ...args);
};
