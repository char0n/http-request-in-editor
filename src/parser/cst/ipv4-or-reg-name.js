'use strict';

const stampit = require('stampit');

const ValueNode = require('./value-node');

const Ipv4OrRegName = stampit(ValueNode, {
  statics: {
    type: 'ipv4-or-reg-name',
  },
});

module.exports = Ipv4OrRegName;
