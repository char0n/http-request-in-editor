'use strict';

const stampit = require('stampit');
const { defaultTo, pipe, find } = require('ramda');

const Node = require('./node');
const { isMethod, isRequestTarget, isHttpVersion } = require('./predicates');

const RequestLine = stampit(Node, {
  statics: {
    type: 'requests-line',
  },
  methods: {
    get method() {
      return pipe(defaultTo(null), find(isMethod))(this.children);
    },
    get requestTarget() {
      return pipe(defaultTo(null), find(isRequestTarget))(this.children);
    },
    get httpVersion() {
      return pipe(defaultTo(null), find(isHttpVersion))(this.children);
    },
  },
});

module.exports = RequestLine;
