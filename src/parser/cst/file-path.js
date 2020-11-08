'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const FilePath = stampit(ValueNode, {
  statics: {
    type: 'file-path',
  },
});

module.exports = FilePath;
