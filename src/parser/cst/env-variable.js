'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const EnvVariable = stampit(ValueNode, {
  statics: {
    type: 'env-variable',
  },
  props: {
    isDynamic: false,
  },
  init({ value = this.value, isDynamic = false } = {}) {
    this.value = value;
    this.isDynamic = isDynamic;
  },
});

module.exports = EnvVariable;
