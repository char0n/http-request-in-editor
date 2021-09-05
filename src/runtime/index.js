'use strict';

const { pathOr } = require('ramda');

const { parse } = require('../parser');
const AxiosRunner = require('./runners/axios');

const runSpec = async (httpSpec, options = {}) => {
  const cstTree = parse(httpSpec);
  const runner = pathOr(AxiosRunner, ['runner'], options)({ cstTree });
  return runner.run();
};

module.exports = {
  runSpec,
};
