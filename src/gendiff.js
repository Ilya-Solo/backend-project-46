import parseAsJson from './parsers.js';
import systemiseObj from './diffObjectGenerate.js';
import getFormattedData from './formatters/index.js';

const gendiff = (path1, path2) => {
  const data1 = parseAsJson(path1);
  const data2 = parseAsJson(path2);
  const systemisedObj = systemiseObj(data1, data2);
  const formattedData = getFormattedData(data1, data2, systemisedObj);

  return formattedData;
};

export default gendiff;
