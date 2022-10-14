'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const Tag = stampit(ValueNode, {
  statics: {
    type: 'tag',
  },
});

module.exports = Tag;
