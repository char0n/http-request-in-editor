'use strict';

const stampit = require('stampit');

const Node = require('./node');

const Authority = stampit(Node, {
  statics: {
    type: 'authority',
  },
});

module.exports = Authority;
