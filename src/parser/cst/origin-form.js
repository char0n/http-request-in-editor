'use strict';

const stampit = require('stampit');

const Node = require('./node');

const OriginForm = stampit(Node, {
  statics: {
    type: 'origin-form',
  },
});

module.exports = OriginForm;
