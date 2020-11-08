'use strict';

const stampit = require('stampit');

const Node = require('./node');

const HierPart = stampit(Node, {
  statics: {
    type: 'hier-part',
  },
});

module.exports = HierPart;
