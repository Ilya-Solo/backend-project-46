import parseAsJson from './parsers.js';
import systemiseObj from './genDiffTree.js';
import getFormattedData from './formatters/index.js';

const gendiff = (path1, path2, formatType) => {
  const data1 = parseAsJson(path1);
  const data2 = parseAsJson(path2);
  const diffTree = systemiseObj(data1, data2);
  const formattedData = getFormattedData(diffTree, formatType);
  return formattedData;
};

export default gendiff;
