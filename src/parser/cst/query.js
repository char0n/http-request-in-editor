'use strict';

const stampit = require('stampit');

const Node = require('./node');

const Query = stampit(Node, {
  statics: {
    type: 'query',
  },
});

module.exports = Query;
