'use strict';

const path = require('path');
const fs = require('fs');
const { assert } = require('chai');
const glob = require('glob');
const nearley = require('nearley');

const grammar = require('../../src/parser/grammar');

const httpFilesPattern = path.join(
  __dirname,
  'fixtures',
  'http',
  '**',
  '*.http'
);

// generate tests dynamically
describe('given http fixtures', function () {
  glob
    .sync(httpFilesPattern, {})
    .filter((httpFile) => !httpFile.endsWith('00000.http'))
    .map((httpFile) => {
      const fileBasename = path.basename(httpFile, '.http');
      const fileDirname = path
        .dirname(httpFile)
        .replace('/test/parser/fixtures/http', '/test/parser/fixtures/ast');
      const astFile = path.join(fileDirname, `${fileBasename}.json`);

      return { astFile, httpFile };
    })
    .forEach(({ httpFile, astFile }) => {
      const testLabel = httpFile.replace(
        path.resolve(__dirname, '..', '..'),
        ''
      );

      context(testLabel, function () {
        const http = fs.readFileSync(httpFile).toString('utf8');
        const ast = JSON.parse(fs.readFileSync(astFile).toString('utf8'));
        const parser = new nearley.Parser(
          nearley.Grammar.fromCompiled(grammar)
        );
        parser.feed(http);

        specify('should produce proper AST', function () {
          assert.deepEqual(parser.results, ast);
        });
      });
    });
});
