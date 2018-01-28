const run = require('./run');

test('should be a function', () => {
  expect(typeof run).toBe('function');
});

describe('should accept parameters', () => {
  test('string or array as first argument command', () => {
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

  test('function or undefined as second argument callback', () => {
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
});

describe('should callback with two parameters', () => {
  test('error and undefined if command string is empty', (done) => {
    run('', (err, data) => {
      expect(err).toBe(null);
      expect(data).toBe(undefined);
      done();
    });
  });

  test('error and undefined if command array is empty', (done) => {
    run([], (err, data) => {
      expect(err).toBe(null);
      expect(data).toBe(undefined);
      done();
    });
  });

  test('null and stdout data on exit code 0', (done) => {
    run('npm -v', (err, data) => {
      expect(err).toBe(null);
      expect(data).toMatch(/[0-9]+\.[0-9]+\.[0-9]+/);
      done();
    });
  });

  test('error and errout data on exit code 1', (done) => {
    run(['node', 'file-does-not-exist'], (err, data) => {
      expect(err instanceof Error).toBe(true);
      expect(data).toMatch('Cannot find module');
      done();
    });
  });
  test('where data is trimmed on exit code 0', () => {
     run('npm -v', (err, data) => {
      expect(data).not.toMatch(/^(\n| )+/);
      expect(data).not.toMatch(/(\n| )+$/);
      done();
    });
  });
  test('where data is trimmed on exit code 1', () => {
     run(['node', 'file-does-not-exist'], (err, data) => {
      expect(data).not.toMatch(/^(\n| )+/);
      expect(data).not.toMatch(/(\n| )+$/);
      done();
    });
  });
});
