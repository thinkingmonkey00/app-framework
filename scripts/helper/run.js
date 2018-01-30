// Runs script and calls back
// Parameters: commands, [interactive], [callback(error,data)]
// - if interactive is true, data will be empty

// Import modules
import cp from 'child_process';

// Export function
export default (...args) => {
  // Define parameters
  const commands = args[0];
  const interactive = typeof args[1] === 'boolean' ? args[1] : false;
  const callback = typeof args[args.length - 1] === 'function' ? args[args.length - 1] : () => {};
  // Spawn child process
  const options = {};
  if (interactive) options.stdio = 'inherit';
  const subProcess = cp.spawn(commands.shift(), commands, options);
  // Remember data
  const allData = [];
  if (!interactive) {
    subProcess.stdout.on('data', (data) => {
      allData.push(data.toString());
    });
    subProcess.stderr.on('data', (data) => {
      allData.push(data.toString());
    });
  }
  // On sub process closure
  subProcess.on('close', (code) => {
    // Trim data
    const allDataStr = allData.join('\n').replace(/^(\n| )+/, '').replace(/(\n| )+$/, '');
    // Callback
    if (code === 0) callback(null, allDataStr);
    else callback(new Error(`Commands exit with error code ${code}`), allDataStr);
  });
};
