'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const AsteriskForm = stampit(ValueNode, {
  statics: {
    type: 'asterisk-form',
  },
});

module.exports = AsteriskForm;
