'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const FieldValue = stampit(ValueNode, {
  statics: {
    type: 'field-value',
  },
});

module.exports = FieldValue;
