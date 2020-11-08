'use strict';

const stampit = require('stampit');

const Node = require('./node');

const Headers = stampit(Node, {
  statics: {
    type: 'headers',
  },
});

module.exports = Headers;
