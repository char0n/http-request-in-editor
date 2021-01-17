'use strict';

const { trim } = require('ramda');
const stampit = require('stampit');

const AbsolutePathVisitor = stampit({
  props: {
    absolutePath: '',
  },
  methods: {
    'path-separator': function pathSeparator(node) {
      this.absolutePath += trim(node.value);
    },
    segment(node) {
      this.absolutePath += node.value;
    },
  },
});

module.exports = AbsolutePathVisitor;
