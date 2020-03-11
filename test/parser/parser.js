'use strict';

const path = require('path');
const assert = require('assert');
const fs = require('fs');
const glob = require('glob');
const nearley = require('nearley');

const grammar = require('../../src/parser/grammar');

const httpFixturePath = path.join(__dirname, 'fixtures', 'http');
const httpFilesPattern = `${httpFixturePath}${path.sep}*.http`;

// generate tests dynamically
describe('given http fixtures', function() {
  glob
    .sync(httpFilesPattern, {})
    .filter(httpFile => !httpFile.endsWith('00000.http'))
    .forEach(httpFile => {
      context(path.basename(httpFile), function() {
        const astFile = path.join(
          path.dirname(httpFile),
          '..',
          'ast',
          `${path.basename(httpFile, '.http')}.json`
        );
        const http = fs.readFileSync(httpFile).toString('utf8');
        const ast = JSON.parse(fs.readFileSync(astFile).toString('utf8'));
        const parser = new nearley.Parser(
          nearley.Grammar.fromCompiled(grammar)
        );
        parser.feed(http);

        specify('should produce proper AST', function() {
          assert.deepStrictEqual(parser.results, ast);
        });
      });
    });
});
