import { load } from 'js-yaml';
import { extname } from 'node:path';
import { readFileSync } from 'node:fs';

const parseAsJson = (filePath) => {
  const fileExtension = extname(filePath);
  const data = readFileSync(filePath);
  let result;
  if (fileExtension === '.yaml' || fileExtension === '.yml') {
    result = load(data);
  } if (fileExtension === '.json') {
    result = JSON.parse(data);
  }
  Error('Exstension is not supported');
  return result;
};
export default parseAsJson;
