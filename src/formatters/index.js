import stylishedFormat from './stylish.js';
import plainFormat from './plain.js';

const getFormattedData = (data1, data2, systemisedObj, formatType = 'plain') => {
  let result;
  switch (formatType) {
    case 'stylish':
      result = stylishedFormat(data1, data2, systemisedObj);
      break;
    case 'plain':
      result = plainFormat(data1, data2, systemisedObj);
      break;
    default:
      Error(`Format ${formatType} is not supported`);
  }
  return result;
};

export default getFormattedData;
