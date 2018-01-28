import run from './run';

test('should be a function', () => {
  expect(typeof run).toBe('function');
});

test('should accept a string or an array as first argument', () => {
  // Test string
  expect(() => run('')).not.toThrow();
  // Test array
  expect(() => run([])).not.toThrow();
  // Test other values
  expect(() => run(undefined)).toThrow();
  expect(() => run(null)).toThrow();
  expect(() => run(123)).toThrow();
  expect(() => run({})).toThrow();
  expect(() => run(() => {})).toThrow();
});

test('should accept a function or undefined as second argument', () => {
  // Test undefined
  expect(() => run('', undefined)).not.toThrow();
  // Test function
  expect(() => run('', () => {})).not.toThrow();
  // Test other values
  expect(() => run('', '')).toThrow();
  expect(() => run('', [])).toThrow();
  expect(() => run('', null)).toThrow();
  expect(() => run('', 123)).toThrow();
  expect(() => run('', {})).toThrow();
});

test('callback function should be called with two parameters error and undefined if command string is empty', (done) => {
  run('', (err, data) => {
    expect(err).toBe(null);
    expect(data).toBe(undefined);
    done();
  });
});

test('callback function should be called with two parameters error and undefined if command array is empty', (done) => {
  run([], (err, data) => {
    expect(err).toBe(null);
    expect(data).toBe(undefined);
    done();
  });
});

test('callback function should be called with two parameters null and stdout on exit code 0', (done) => {
  run('npm -v', (err, data) => {
    expect(err).toBe(null);
    expect(data).toMatch(/[0-9]+\.[0-9]+\.[0-9]+/);
    done();
  });
});

test('callback function should be called with two parameters error and errout on exit code 1', (done) => {
  run(['node', 'file-does-not-exist'], (err, data) => {
    expect(err instanceof Error).toBe(true);
    expect(data).toMatch('Cannot find module');
    done();
  });
});
