'use strict';

const fs = require('fs');
const path = require('path');
const { assert } = require('chai');
const { trim, split, map, tail, splitEvery, pipe } = require('ramda');

const { parse } = require('../../src/parser');
const { visit } = require('../../src/visitor');
const { Visitor, keyMap } = require('../helpers');

const documentSeparator = '='.repeat(80);
const httpASTSeparator = '-'.repeat(80);
const transformer = pipe(
  split(documentSeparator),
  tail,
  splitEvery(2),
  map(([header, httpAstPair]) => {
    const [http, astRep] = split(httpASTSeparator, httpAstPair);
    return [trim(header), http, trim(astRep)];
  })
);
const corpus = transformer(
  fs.readFileSync(path.join(__dirname, 'corpus.txt')).toString()
);

describe('corpus', function () {
  corpus.forEach(([header, http, astRep]) => {
    context(header, function () {
      specify('should verify corpus record', function () {
        const astTree = parse(http);
        const visitor = Visitor();

        visit(astTree[0], visitor, { keyMap });

        assert.lengthOf(astTree, 1);
        assert.strictEqual(visitor.result, astRep);
      });
    });
  });
});
