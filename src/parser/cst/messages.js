'use strict';

const stampit = require('stampit');

const Node = require('./node');

const Messages = stampit(Node, {
  statics: {
    type: 'messages',
  },
});

module.exports = Messages;
