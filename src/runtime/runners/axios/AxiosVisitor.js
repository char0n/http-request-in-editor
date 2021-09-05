'use strict';

const stampit = require('stampit');

const { visit } = require('../../../visitor');
const RequestTargetVisitor = require('../../visitors/generics/RequestTargetVisitor');
const MessageBodyVisitor = require('../../visitors/generics/MessageBodyVisitor');

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

      const url = new URL(visitor.requestTarget);

      this.config.url = url.pathname;
      this.config.baseURL = `${url.protocol}//${url.hostname}/`;
      this.config.params = url.searchParams;

      return false;
    },
    headers() {
      this.config.headers = {};
    },
    'header-field': function headerField(node) {
      this.config.headers[node.fieldName.value] = node.fieldValue.value;

      return false;
    },
    'message-body': function messageBody(node) {
      const visitor = MessageBodyVisitor();

      visit(node, visitor);

      this.config.data = visitor.messageBody;

      return false;
    },
  },
});

module.exports = AxiosVisitor;
