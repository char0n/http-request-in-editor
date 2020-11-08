'use strict';

const stampit = require('stampit');

const Node = require('./node');

const AbsoluteForm = stampit(Node, {
  statics: {
    type: 'absolute-form',
  },
});

module.exports = AbsoluteForm;
