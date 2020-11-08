'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const HttpVersion = stampit(ValueNode, {
  statics: {
    type: 'http-version',
  },
});

module.exports = HttpVersion;
