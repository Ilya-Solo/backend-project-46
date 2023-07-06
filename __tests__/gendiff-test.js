test('flat test', () => {
  const filepath1 = '/__tests__/file1.json';
  const filepath2 = '/__tests__/file2.json';
  const correctResult = `{
        - follow: false
          host: hexlet.io
        - proxy: 123.234.53.22
        - timeout: 50
        + timeout: 20
        + verbose: true
      }`;
  expect(gendiff(filepath1, filepath2)).toStrictEqual(correctResult);
});
