'use strict';

const stampit = require('stampit');

const Node = require('./node');

const HeaderField = stampit(Node, {
  statics: {
    type: 'header-field',
  },
});

module.exports = HeaderField;
