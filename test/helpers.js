'use strict';

const fs = require('fs');
const path = require('path');

const readHttp = (file) =>
  fs
    .readFileSync(path.join(__dirname, `./parser/fixtures/http/${file}.http`))
    .toString('utf8');

const readAst = (file) =>
  JSON.parse(
    fs
      .readFileSync(path.join(__dirname, `./parser/fixtures/ast/${file}.json`))
      .toString('utf8')
  );

module.exports = {
  readAst,
  readHttp,
};
