'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const Segment = stampit(ValueNode, {
  statics: {
    type: 'segment',
  },
});

module.exports = Segment;
