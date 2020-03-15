'use strict';

const nearley = require('nearley');

const grammar = require('./grammar');

const compiledGrammar = nearley.Grammar.fromCompiled(grammar);

// createParser :: () -> Parser
const createParser = () => new nearley.Parser(compiledGrammar);

// parse :: String -> Array
const parse = http => {
  const parser = createParser();
  parser.feed(http);
  return parser.results;
};

module.exports = {
  createParser,
  parse,
};
