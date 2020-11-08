'use strict';

const stampit = require('stampit');

const Node = require('./node');

const AbsolutePath = stampit(Node, {
  statics: {
    type: 'absolute-path',
  },
});

module.exports = AbsolutePath;
