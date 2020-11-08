'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const Scheme = stampit(ValueNode, {
  statics: {
    type: 'scheme',
  },
});

module.exports = Scheme;
