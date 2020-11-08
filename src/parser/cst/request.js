'use strict';

const stampit = require('stampit');
const { defaultTo } = require('ramda');

const Node = require('./node');

const Request = stampit(Node, {
  statics: {
    type: 'request',
  },
  methods: {
    get requestLine() {
      return defaultTo(null, this.children[0]);
    },
  },
});

module.exports = Request;
