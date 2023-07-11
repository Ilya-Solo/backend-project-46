import { readFileSync } from 'node:fs';
import gendiff from '../src/gendiff.js';

test('yaml parser test', () => {
  const filepath1 = '__fixtures__/file1.yaml';
  const filepath2 = '__fixtures__/file2.yaml';
  const correctAnswerFilePath = '__fixtures__/correctPlain.txt';
  const correctResult = readFileSync(correctAnswerFilePath).toString();

  expect(gendiff(filepath1, filepath2, 'plain')).toStrictEqual(correctResult);
});

test('plain format test', () => {
  const filepath1 = '__fixtures__/file1.json';
  const filepath2 = '__fixtures__/file2.json';
  const correctAnswerFilePath = '__fixtures__/correctPlain.txt';
  const correctResult = readFileSync(correctAnswerFilePath).toString();

  expect(gendiff(filepath1, filepath2, 'plain')).toStrictEqual(correctResult);
});

test('stylish format test', () => {
  const filepath1 = '__fixtures__/file1.json';
  const filepath2 = '__fixtures__/file2.json';
  const correctAnswerFilePath = '__fixtures__/correctStylish.txt';
  const correctResult = readFileSync(correctAnswerFilePath).toString();

  expect(gendiff(filepath1, filepath2, 'stylish')).toStrictEqual(correctResult);
});

test('json format test', () => {
  const filepath1 = '__fixtures__/file1.json';
  const filepath2 = '__fixtures__/file2.json';
  const correctAnswerFilePath = '__fixtures__/correctJson.txt';
  const correctResult = readFileSync(correctAnswerFilePath).toString();

  expect(gendiff(filepath1, filepath2, 'json')).toStrictEqual(correctResult);
});
