'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const Fragment = stampit(ValueNode, {
  statics: {
    type: 'fragment',
  },
});

module.exports = Fragment;
