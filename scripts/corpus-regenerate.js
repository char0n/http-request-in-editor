'use strict';

const fs = require('fs');
const path = require('path');
const { trim, split, map, tail, splitEvery, pipe } = require('ramda');

const { parse } = require('../src/parser');
const { visit } = require('../src/visitor');
const { RepresentationVisitor, keyMap } = require('../test/helpers');

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
const corpusPath = path.join(__dirname, '..', 'test', 'corpus', 'corpus.txt');
const corpus = transformer(fs.readFileSync(corpusPath).toString());

const regeneratedCorpus = corpus
  .map(([header, http]) => {
    const astTree = parse(http);
    const visitor = RepresentationVisitor();

    visit(astTree[0], visitor, { keyMap });
    return `${documentSeparator}\n${header}\n${documentSeparator}${http}${httpASTSeparator}\n\n${visitor.result}\n\n`;
  })
  .join('');

fs.writeFileSync(corpusPath, regeneratedCorpus);

console.info('Corpus successfully regenerated.');
