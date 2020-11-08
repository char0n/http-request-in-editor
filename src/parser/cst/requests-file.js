'use strict';

const stampit = require('stampit');

const Node = require('./node');

const RequestsFile = stampit(Node, {
  statics: {
    type: 'requests-file',
  },
  methods: {
    get requests() {
      return this.children;
    },
  },
});

module.exports = RequestsFile;
