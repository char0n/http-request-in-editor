'use strict';

const stampit = require('stampit');

const Node = require('./node');

const MessageBody = stampit(Node, {
  statics: {
    type: 'message-body',
  },
});

module.exports = MessageBody;
