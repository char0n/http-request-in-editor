'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const HandlerScript = stampit(ValueNode, {
  statics: {
    type: 'handler-script',
  },
});

module.exports = HandlerScript;
