'use strict';

const stampit = require('stampit');
const { always } = require('ramda');

const Visitor = stampit({
  props: {
    nestingLevel: 0,
    result: '',
  },
  methods: {
    enter(node) {
      const indent = '  '.repeat(this.nestingLevel);
      this.result += this.nestingLevel > 0 ? '\n' : '';
      this.result += `${indent}(${node.type}`;
      this.nestingLevel += 1;
    },
    leave() {
      this.nestingLevel -= 1;
      this.result += ')';
    },
  },
});

const keyMap = new Proxy(
  {},
  {
    get: always(['children']),
  }
);

module.exports = {
  Visitor,
  keyMap,
};
