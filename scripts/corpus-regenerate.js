'use strict';

const fs = require('fs');
const path = require('path');
const { trim, split, map, tail, splitEvery, pipe } = require('ramda');

const { parse, sexprs } = require('../src');

const documentSeparator = '='.repeat(80);
const httpCSTSeparator = '-'.repeat(80);
const transformer = pipe(
  split(documentSeparator),
  tail,
  splitEvery(2),
  map(([header, httpAstPair]) => {
    const [http, sExpression] = split(httpCSTSeparator, httpAstPair);
    return [trim(header), http, trim(sExpression)];
  })
);
const corpusPath = path.join(__dirname, '..', 'test', 'corpus', 'corpus.txt');
const corpus = transformer(fs.readFileSync(corpusPath).toString());

const regeneratedCorpus = corpus
  .map(([header, http]) => {
    const cstTree = parse(http);

    return `${documentSeparator}\n${header}\n${documentSeparator}${http}${httpCSTSeparator}\n\n${sexprs(
      cstTree
    )}\n\n`;
  })
  .join('');

fs.writeFileSync(corpusPath, regeneratedCorpus);

// eslint-disable-next-line no-console
console.info('Corpus successfully regenerated.');
