'use strict';

const stampit = require('stampit');

const Node = require('./node');

const RequestTarget = stampit(Node, {
  statics: {
    type: 'request-target',
  },
});

module.exports = RequestTarget;
