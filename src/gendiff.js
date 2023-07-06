import { readFileSync } from 'node:fs';
import _ from 'lodash';

const gendiff = (path1, path2) => {
    const data1 = JSON.parse(readFileSync(path1));
    const data2 = JSON.parse(readFileSync(path2));
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

    const result = _.sortBy(Object.entries(systemisedObj), ([key,]) => key)
        .reduce((acc, [key, state]) => {
            switch (state) {
                case 'added':
                    return `${acc}  + ${key}: ${data2[key]}\n`;
                case 'deleted':
                    return `${acc}  - ${key}: ${data1[key]}\n`;
                case 'changed':
                    return `${acc}  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
                case 'unchanged':
                    return `${acc}    ${key}: ${data1[key]}\n`;
            }
        }, '');

    return `{\n${result}}`;
}
export default gendiff;
