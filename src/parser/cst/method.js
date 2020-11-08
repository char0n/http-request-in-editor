'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const Method = stampit(ValueNode, {
  statics: {
    type: 'method',
  },
});

module.exports = Method;
