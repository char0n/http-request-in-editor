'use strict';

const { assert } = require('chai');
const nearley = require('nearley');

const helpers = require('../helpers');
const parserModule = require('../../src/parser');

describe('parser', function () {
  it('should expose proper public API', function () {
    assert.isFunction(parserModule.createParser);
    assert.isFunction(parserModule.parse);
  });

  context('createParser', function () {
    specify('should return parser instance', function () {
      const parser = parserModule.createParser();

      assert.instanceOf(parser, nearley.Parser);
    });
  });

  context('parse', function () {
    context('given http fragment', function () {
      const http = helpers.readHttp('requests-file/00001');
      const expectedAst = helpers.readAst('requests-file/00001');

      specify('should parse and return AST', function () {
        const actualAst = parserModule.parse(http);

        assert.deepEqual(actualAst, expectedAst);
      });
    });
  });
});
