'use strict';

const stampit = require('stampit');

const Node = require('./node');

const ResponseHandler = stampit(Node, {
  statics: {
    type: 'response-handler',
  },
});

module.exports = ResponseHandler;
