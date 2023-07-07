import _ from 'lodash';

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

export default systemiseObj;
