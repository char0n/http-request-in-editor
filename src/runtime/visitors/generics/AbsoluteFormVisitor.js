'use strict';

const stampit = require('stampit');

const { visit } = require('../../../visitor');
const AbsolutePathVisitor = require('./AbsolutePathVisitor');

const AbsoluteFormVisitor = stampit({
  props: {
    absoluteForm: '',
  },
  methods: {
    scheme(node) {
      this.absoluteForm = `${node.value}://`;
    },
    'ipv4-or-reg-name': function ipv4OrRegName(node) {
      this.absoluteForm += node.value;
    },
    'ipv6-address': function ipv6Address(node) {
      this.absoluteForm += `[${node.value}]`;
    },
    'absolute-path': function absolutePath(node) {
      const visitor = AbsolutePathVisitor();

      visit(node, visitor);
      this.absoluteForm += visitor.absolutePath;

      return false;
    },
    query(node) {
      this.absoluteForm += `?${node.value}`;
    },
    fragment(node) {
      this.absoluteForm += `#${node.value}`;
    },
  },
});

module.exports = AbsoluteFormVisitor;
