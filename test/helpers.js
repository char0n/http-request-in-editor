'use strict';

const stampit = require('stampit');

const RepresentationVisitor = stampit({
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

module.exports = {
  RepresentationVisitor,
};
