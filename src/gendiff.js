import _ from 'lodash';
import parseAsJson from './parsers.js';

const tab = '    ';

const systemiseObj = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  return keys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc[key] = 'added';
    } else if (!Object.hasOwn(data2, key)) {
      acc[key] = 'deleted';
    } else if (_.isEqual(data1[key], data2[key])) {
      acc[key] = 'unchanged';
    } else if (data1[key] instanceof Object && data2[key] instanceof Object) {
      acc[key] = systemiseObj(data1[key], data2[key]);
    } else {
      acc[key] = 'changed';
    }
    return acc;
  }, {});
};

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

const gendiff = (path1, path2) => {
  const data1 = parseAsJson(path1);
  const data2 = parseAsJson(path2);
  const systemisedObj = systemiseObj(data1, data2);
  const formattedData = format(data1, data2, systemisedObj, 0);

  return formattedData;
};

export default gendiff;
