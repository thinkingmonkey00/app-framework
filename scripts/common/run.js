import cp from 'child_process';

export default (...args) => {
  // Get arguments
  const commands = args[0];
  const interactive = typeof args[1] === 'boolean' ? args[1] : false;
  const callback = typeof args[args.length - 1] === 'function' ? args[args.length - 1] : () => {};
  // Check arguments
  if (args.length < 1 || args.length > 3) throw new Error('run() requires one to three arguments');
  if (!Array.isArray(commands)) throw new Error('run() requires array as first argument commands');
  if (typeof interactive !== 'boolean') throw new Error('run() requires boolean as second argument interactive');
  if (typeof callback !== 'function') throw new Error('run() requires function as third argument callback');
  // Spawn child process
  const options = {};
  if (interactive) options.stdio = 'inherit';
  const subProcess = cp.spawn(commands.shift(), commands, options);
  // Remember data
  const allData = [];
  subProcess.stdout.on('data', (data) => {
    allData.push(data.toString());
  });
  subProcess.stderr.on('data', (data) => {
    allData.push(data.toString());
  });
  // Callback on close
  subProcess.on('close', (code) => {
    const allDataStr = allData.join('\n').replace(/^(\n| )+/, '').replace(/(\n| )+$/, '');
    if (code === 0) callback(null, allDataStr);
    else callback(new Error(`Commands exit with error code ${code}`), allDataStr);
  });
};
