'use strict';

const fs = require('fs');
const path = require('path');
const { assert } = require('chai');
const { trim, split, map, tail, splitEvery, pipe } = require('ramda');

const { parse } = require('../../src/parser');
const { visit } = require('../../src/visitor');
const { RepresentationVisitor } = require('../helpers');

const documentSeparator = '='.repeat(80);
const httpCSTSeparator = '-'.repeat(80);
const transformer = pipe(
  split(documentSeparator),
  tail,
  splitEvery(2),
  map(([header, httpCSTPair]) => {
    const [http, cstRep] = split(httpCSTSeparator, httpCSTPair);
    return [trim(header), http, trim(cstRep)];
  })
);
const corpus = transformer(
  fs.readFileSync(path.join(__dirname, 'corpus.txt')).toString()
);

describe('corpus', function () {
  corpus.forEach(([header, http, cstRep]) => {
    context(header, function () {
      specify('should verify corpus record', function () {
        const cstTree = parse(http);
        const visitor = RepresentationVisitor();

        visit(cstTree[0], visitor);

        assert.lengthOf(cstTree, 1);
        assert.strictEqual(visitor.result, cstRep);
      });
    });
  });
});
