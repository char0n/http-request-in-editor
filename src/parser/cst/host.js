'use strict';

const stampit = require('stampit');

const Node = require('./node');

const Host = stampit(Node, {
  statics: {
    type: 'host',
  },
});

module.exports = Host;
