import a from './a';

test('func a', () => {
  expect(typeof a).toBe('function')
})
test('func a called', () => {
  console.log = jest.fn();
  a();
  expect(console.log).toBeCalled();
})
test('func a calledfoo', () => {
  console.log = jest.fn();
  a();
  expect(console.log).toBeCalledWith('foo');
})