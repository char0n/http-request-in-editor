'use strict';

const stampit = require('stampit');

const Node = require('./node');

const ValueNode = stampit(Node, {
  statics: {
    type: 'value-node',
  },
  props: {
    value: null,
  },
  init({ value = this.value } = {}) {
    this.value = value;
  },
});

module.exports = ValueNode;
