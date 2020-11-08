'use strict';

const stampit = require('stampit');

const Node = require('./node');

const InputFileRef = stampit(Node, {
  statics: {
    type: 'input-file-ref',
  },
});

module.exports = InputFileRef;
