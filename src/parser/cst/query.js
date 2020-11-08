'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const Query = stampit(ValueNode, {
  statics: {
    type: 'query',
  },
});

module.exports = Query;
