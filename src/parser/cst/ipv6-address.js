'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const Ipv6Address = stampit(ValueNode, {
  statics: {
    type: 'ipv6-address',
  },
});

module.exports = Ipv6Address;
