'use strict';

const stampit = require('stampit');
const axios = require('axios');
const { allSettledP } = require('ramda-adjunct');

const AxiosVisitor = require('./AxiosVisitor');
const { visit } = require('../../../visitor');

const AxiosRunner = stampit({
  props: {
    cstTree: null,
    visitor: null,
  },
  init({ cstTree }) {
    this.cstTree = cstTree;
    this.visitor = AxiosVisitor();
  },
  methods: {
    async run() {
      visit(this.cstTree, this.visitor);
      const { configs } = this.visitor;

      return allSettledP(configs.map(axios));
    },
  },
});

module.exports = AxiosRunner;
