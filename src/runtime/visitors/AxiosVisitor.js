'use strict';

const stampit = require('stampit');

const { visit } = require('../../visitor');
const RequestTargetVisitor = require('./generics/RequestTargetVisitor');

const AxiosVisitor = stampit({
  props: {
    configs: [],
    config: {},
  },
  init() {
    this.configs = [];
  },
  methods: {
    request() {
      this.config = {};
      this.configs.push(this.config);
    },
    method(node) {
      this.config.method = node.value.toLowerCase();
    },
    'http-version': function httpVersion(node) {
      if (node.value === '2.0') {
        throw new Error("AxiosVisitor doesn't support HTTP/2.0");
      }
    },
    'request-target': function requestTarget(node) {
      const visitor = RequestTargetVisitor();

      visit(node, visitor);
      this.config.url = visitor.requestTarget;

      return false;
    },
  },
});

module.exports = AxiosVisitor;
