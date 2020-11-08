'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const EnvVariable = stampit(ValueNode, {
  statics: {
    type: 'env-variable',
  },
  methods: {
    get name() {
      return this.value.match(/^{{\s*(?<variable_name>[a-zA-Z0-9_-]+)\s*}}$/)
        .groups.variable_name;
    },
  },
});

module.exports = EnvVariable;
