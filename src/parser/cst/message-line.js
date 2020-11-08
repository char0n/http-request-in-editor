'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const MessageLine = stampit(ValueNode, {
  statics: {
    type: 'message-line',
  },
});

module.exports = MessageLine;
