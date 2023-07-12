import stylishedFormat from './stylish.js';
import plainFormat from './plain.js';

const getFormattedData = (diffTree, formatType) => {
  let result;
  switch (formatType) {
    case 'stylish':
      result = stylishedFormat(diffTree);
      break;
    case 'plain':
      result = plainFormat(diffTree);
      break;
    case 'json':
      result = JSON.stringify(diffTree);
      break;
    default:
      Error(`Format ${formatType} is not supported`);
  }
  return result;
};

export default getFormattedData;
