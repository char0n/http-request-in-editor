'use strict';

const stampit = require('stampit');
const { head, last } = require('ramda');

const Node = require('./node');

const HeaderField = stampit(Node, {
  statics: {
    type: 'header-field',
  },
  methods: {
    get fieldName() {
      return head(this.children);
    },
    get fieldValue() {
      return last(this.children);
    },
  },
});

module.exports = HeaderField;
