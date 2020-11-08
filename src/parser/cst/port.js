'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const Port = stampit(ValueNode, {
  statics: {
    type: 'port',
  },
});

module.exports = Port;
