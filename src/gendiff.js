import _ from 'lodash';
import parseAsJson from './parsers.js';

const gendiff = (path1, path2) => {
  const data1 = parseAsJson(path1);
  const data2 = parseAsJson(path2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const systemisedObj = keys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc[key] = 'added';
    } else if (!Object.hasOwn(data2, key)) {
      acc[key] = 'deleted';
    } else if (data1[key] !== data2[key]) {
      acc[key] = 'changed';
    } else {
      acc[key] = 'unchanged';
    }
    return acc;
  }, {});

  const result = _.sortBy(Object.entries(systemisedObj), ([key]) => key)
    .reduce((acc, [key, state]) => {
      let res;
      switch (state) {
        case 'added':
          res = `${acc}  + ${key}: ${data2[key]}\n`;
          break;
        case 'deleted':
          res = `${acc}  - ${key}: ${data1[key]}\n`;
          break;
        case 'changed':
          res = `${acc}  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
          break;
        case 'unchanged':
          res = `${acc}    ${key}: ${data1[key]}\n`;
          break;
        default:
          Error('Impossible case');
      }
      return res;
    }, '');

  return `{\n${result}}`;
};
export default gendiff;
