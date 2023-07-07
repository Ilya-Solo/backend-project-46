import _ from 'lodash';

const digWithFomating = (object, keys) => {
  const value = keys.reduce((acc, key) => acc[key], object);
  let result;
  switch (typeof value) {
    case 'object':
      result = '[complex value]';
      break;
    case 'string':
      result = `'${value}'`;
      break;
    default:
      result = value;
  }
  return result;
};

const format = (data1, data2, systemisedObj) => {
  const plainFormatter = (_systemisedObj, keyPath = []) => {
    const output = _.sortBy(Object.entries(_systemisedObj), ([key]) => key)
      .flatMap(([key, state]) => {
        const currentKeyPath = [...keyPath, key];
        switch (state) {
          case 'changed':
            return `Property '${currentKeyPath.join('.')}' was updated. From ${digWithFomating(data1, currentKeyPath)} to ${digWithFomating(data2, currentKeyPath)}`;
          case 'added':
            return `Property '${currentKeyPath.join('.')}' was added with value: ${digWithFomating(data2, currentKeyPath)}`;
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

export default format;
