'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const PathSeparator = stampit(ValueNode, {
  statics: {
    type: 'path-separator',
  },
});

module.exports = PathSeparator;
