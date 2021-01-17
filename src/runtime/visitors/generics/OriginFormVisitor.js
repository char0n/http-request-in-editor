'use strict';

const stampit = require('stampit');

const { visit } = require('../../../visitor');
const AbsolutePathVisitor = require('./AbsolutePathVisitor');

const OriginFormVisitor = stampit({
  props: {
    originForm: '',
  },
  methods: {
    'absolute-path': function absolutePath(node) {
      const visitor = AbsolutePathVisitor();

      visit(node, visitor);
      this.originForm += visitor.absolutePath;

      return false;
    },
    query(node) {
      this.originForm += `?${node.value}`;
    },
    fragment(node) {
      this.originForm += `#${node.value}`;
    },
  },
});

module.exports = OriginFormVisitor;
