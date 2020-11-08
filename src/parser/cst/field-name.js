'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const FieldName = stampit(ValueNode, {
  statics: {
    type: 'field-name',
  },
});

module.exports = FieldName;
