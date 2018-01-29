const config = require('../../helper/config-eslint');

test('should return an object', () => {
  expect(typeof config).toBe('object');
  expect(config).not.toBe(null);
});
