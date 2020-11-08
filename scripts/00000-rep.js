'use strict';

const fs = require('fs');
const path = require('path');

const { parse } = require('../src/parser');
const { visit } = require('../src/visitor');
const { Visitor, keyMap } = require('../test/helpers');

const httpPath = path.join(
  __dirname,
  '..',
  'test/parser/fixtures/http/00000.http'
);
const http = fs.readFileSync(httpPath).toString();
const astTree = parse(http);
const visitor = Visitor();

visit(astTree[0], visitor, { keyMap });

console.log(visitor.result);
