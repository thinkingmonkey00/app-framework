import index from './index';

test('should return an object', () => {
  expect(typeof index).toBe('object');
  expect(index).not.toBe(null);
});

test('should contain run function', () => expect(typeof index.run).toBe('function'));
