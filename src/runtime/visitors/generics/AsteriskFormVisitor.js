'use strict';

const stampit = require('stampit');

const AsteriskFormVisitor = stampit({
  props: {
    asteriskForm: '',
  },
  methods: {
    'asterisk-form': function asteriskForm(node) {
      this.asteriskForm = node.value;
    },
  },
});

module.exports = AsteriskFormVisitor;
