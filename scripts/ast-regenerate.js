'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob'); // eslint-disable-line import/no-extraneous-dependencies
const nearley = require('nearley');

const grammar = require('../src/parser/grammar');

const httpFilesPattern = path.join(
  __dirname,
  '..',
  'test',
  'parser',
  'fixtures',
  'http',
  '**',
  '*.http'
);
const astFilesPath = path.join(
  __dirname,
  '..',
  'test',
  'parser',
  'fixtures',
  'ast'
);

const generateAST = (file) => {
  const fileBasename = path.basename(file, '.http');
  const fileDirname = path
    .dirname(file)
    .replace('/test/parser/fixtures/http', '/test/parser/fixtures/ast');
  const astFile = path.join(fileDirname, `${fileBasename}.json`);
  const http = fs.readFileSync(file).toString('utf8');
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(http);
  fs.mkdirSync(fileDirname, { recursive: true });
  fs.writeFileSync(astFile, JSON.stringify(parser.results, null, 1));
};

// clean old AST
fs.rmdirSync(astFilesPath, { recursive: true });

// regenerate AST
glob
  .sync(httpFilesPattern, {})
  .filter((file) => !file.endsWith('00000.http'))
  .forEach(generateAST);
