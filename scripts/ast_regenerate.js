'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const nearley = require('nearley');
const grammar = require('../src/parser/grammar');

const httpFixturePath = path.join(__dirname, '..', 'test', 'parser', 'fixtures', 'http');
const astFixturePath = path.join(__dirname, '..', 'test', 'parser', 'fixtures', 'ast');
const httpFilesPattern = `${httpFixturePath}${path.sep}*.http`;
const astFilesPattern = `${astFixturePath}${path.sep}*.json`;

const generateAST = file => {
  const fileBasename = path.basename(file, '.http');
  const fileDirname = path.dirname(file);
  const astFile = path.join(fileDirname, '..', 'ast', `${fileBasename}.json`);
  const http = fs.readFileSync(file).toString('utf8');
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(http);
  fs.writeFileSync(astFile, JSON.stringify(parser.results, null, 1));
};

// clean old AST
glob.sync(astFilesPattern, {}).forEach(
  file => fs.unlinkSync(file)
);

// regenerate AST
glob(httpFilesPattern, {}, (error, files) => {
  files.forEach(generateAST);
});