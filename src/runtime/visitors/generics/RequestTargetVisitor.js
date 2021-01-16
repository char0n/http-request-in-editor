'use strict';

const stampit = require('stampit');

const { BREAK, visit } = require('../../../visitor');
const OriginFormVisitor = require('./OriginFormVisitor');
const AbsoluteFormVisitor = require('./AbsoluteFormVisitor');
const AsteriskFormVisitor = require('./AsteriskFormVisitor');

const RequestTargetVisitor = stampit({
  prop: {
    requestTarget: '',
  },
  methods: {
    'origin-form': function originForm(node) {
      const visitor = OriginFormVisitor();

      visit(node, visitor);
      this.requestTarget = visitor.originForm;

      return BREAK;
    },
    'absolute-form': function absoluteForm(node) {
      const visitor = AbsoluteFormVisitor();

      visit(node, visitor);
      this.requestTarget = visitor.absoluteForm;

      return BREAK;
    },
    'asterisk-form': function asteriskForm(node) {
      const visitor = AsteriskFormVisitor();

      visit(node, visitor);
      this.requestTarget = visitor.asteriskForm;

      return BREAK;
    },
  },
});

module.exports = RequestTargetVisitor;
