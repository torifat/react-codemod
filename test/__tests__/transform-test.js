jest.autoMockOff();

import fs from 'fs';
import path from 'path';
// import jscodeshift from 'jscodeshift';
const jscodeshift = require('jscodeshift');

function read(fileName) {
  return fs.readFileSync(path.resolve(__dirname + '/../' + fileName), 'utf8');
}

function test(transformName, testFileName, options) {
  const basePath = testFileName + '.js',
        source = read(testFileName + '.js'),
        output = read(testFileName + '.output.js'),
        transform = require('../../transforms/' + transformName);
  expect(
    (transform({basePath, source}, {jscodeshift}, options || {}) || '').trim()
  ).toEqual(
    output.trim()
  );
}

describe('Transform Tests', () => {

  it('transforms the "react-createClass-to-js-2015-class" tests correctly', () => {
    test('react-createClass-to-js-2015-class', 'react-createClass-to-js-2015-class-test');
  });

});
