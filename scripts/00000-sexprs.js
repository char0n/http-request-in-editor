'use strict';

const fs = require('fs');
const path = require('path');

const { parse, sexprs } = require('../src');

const httpPath = path.join(
  __dirname,
  '..',
  'test/parser/fixtures/http/00000.http'
);
const http = fs.readFileSync(httpPath).toString();
const cstTree = parse(http);

// eslint-disable-next-line no-console
console.log(sexprs(cstTree));
