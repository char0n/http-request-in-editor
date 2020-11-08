'use strict';

const stampit = require('stampit');

const Node = require('./node');

const ResponseRef = stampit(Node, {
  statics: {
    type: 'response-ref',
  },
});

module.exports = ResponseRef;
