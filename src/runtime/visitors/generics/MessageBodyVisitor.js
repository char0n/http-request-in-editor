'use strict';

const stampit = require('stampit');

const MessageBodyVisitor = stampit({
  props: {
    messageBody: '',
  },
  methods: {
    'message-line': function messageLine(node) {
      this.messageBody += node.value;
    },
  },
});

module.exports = MessageBodyVisitor;
