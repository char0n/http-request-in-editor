'use strict';

const { assert } = require('chai');
const dedent = require('dedent');
const nearley = require('nearley');

const { parse, createParser } = require('../../src/parser');

describe('parser', function () {
  it('should expose proper public API', function () {
    assert.isFunction(createParser);
    assert.isFunction(parse);
  });

  context('createParser', function () {
    specify('should return parser instance', function () {
      const parser = createParser();

      assert.instanceOf(parser, nearley.Parser);
    });
  });

  context('parse', function () {
    context('given http fragment', function () {
      const http = dedent`
        GET http://www.example.com

        ###
      `;

      specify('should parse and return CST', function () {
        const actualCST = parse(http);

        assert.isArray(actualCST);
      });
    });

    context('given invalid http fragment', function () {
      const http = 'invalid http content';

      specify('should throw Error', function () {
        const errorThunk = () => parse(http);

        assert.throws(errorThunk, Error);
      });
    });
  });
});
