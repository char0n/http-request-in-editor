'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const Literal = stampit(ValueNode, {
  statics: {
    type: 'literal',
  },
});

module.exports = Literal;
