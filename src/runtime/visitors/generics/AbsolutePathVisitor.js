'use strict';

const stampit = require('stampit');

const AbsolutePathVisitor = stampit({
  props: {
    absolutePath: '',
  },
});

module.exports = AbsolutePathVisitor;
