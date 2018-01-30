// Returns type of input as string

// Export function
export default (input) => {
  // undefined
  if (input === undefined) return 'undefined';
  // null
  if (input === null) return 'null';
  // boolean
  if (typeof input === 'boolean') return 'boolean';
  // function
  if (typeof input === 'function') return 'function';
  // symbol
  if (typeof input === 'symbol') return 'symbol';
  // string
  if (typeof input === 'string') return 'string';
  // number
  if (typeof input === 'number') return 'number';
  // array
  if (Array.isArray(input)) return 'array';
  // error
  if (input instanceof Error) return 'error';
  // object
  return 'object';
};
