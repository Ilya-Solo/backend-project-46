import _ from 'lodash';

const tab = '    ';

const beautifyOutput = (data, depth = 0) => {
  if (!(data instanceof Object)) {
    return `${data}`;
  }

  const result = Object.entries(data).reduce((acc, [key, value]) => {
    const newValue = (value instanceof Object) ? beautifyOutput(value, depth + 1) : value;
    return `${acc}${tab.repeat(depth)}    ${key}: ${newValue}\n`;
  }, '');

  return `{\n${result}${tab.repeat(depth)}}`;
};

const format = (data1, data2, systemisedObj, depth = 0) => {
  const output = _.sortBy(Object.entries(systemisedObj), ([key]) => key)
    .reduce((acc, [key, state]) => {
      let res;
      switch (state) {
        case 'added':
          res = `${acc}${tab.repeat(depth)}  + ${key}: ${beautifyOutput(data2[key], depth + 1)}\n`;
          break;
        case 'deleted':
          res = `${acc}${tab.repeat(depth)}  - ${key}: ${beautifyOutput(data1[key], depth + 1)}\n`;
          break;
        case 'changed':
          res = `${acc}${tab.repeat(depth)}  - ${key}: ${beautifyOutput(data1[key], depth + 1)}\n${tab.repeat(depth)}  + ${key}: ${beautifyOutput(data2[key], depth + 1)}\n`;
          break;
        case 'unchanged':
          res = `${acc}${tab.repeat(depth)}    ${key}: ${beautifyOutput(data1[key], depth + 1)}\n`;
          break;
        default:
          res = `${acc}${tab.repeat(depth)}    ${key}: ${format(data1[key], data2[key], systemisedObj[key], depth + 1)}`;
      }
      return res;
    }, '');

  return `{\n${output}${tab.repeat(depth)}}\n`;
};

export default format;
