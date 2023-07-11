import _ from 'lodash';

const digWithFormating = (object, keys) => {
  const value = keys.reduce((acc, key) => acc[key], object);
  if (value instanceof Object) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const format = (data1, data2, systemisedObj) => {
  const plainFormatter = (_systemisedObj, keyPath = []) => {
    const output = _.sortBy(Object.entries(_systemisedObj), ([key]) => key)
      .flatMap(([key, state]) => {
        const currentKeyPath = [...keyPath, key];
        switch (state) {
          case 'changed':
            return `Property '${currentKeyPath.join('.')}' was updated. From ${digWithFormating(data1, currentKeyPath)} to ${digWithFormating(data2, currentKeyPath)}`;
          case 'added':
            return `Property '${currentKeyPath.join('.')}' was added with value: ${digWithFormating(data2, currentKeyPath)}`;
          case 'deleted':
            return `Property '${currentKeyPath.join('.')}' was removed`;
          case 'unchanged':
            return [];
          default:
            return plainFormatter(_systemisedObj[key], currentKeyPath);
        }
      });
    return output;
  };
  return plainFormatter(systemisedObj).join('\n');
};

console.log();
export default format;
