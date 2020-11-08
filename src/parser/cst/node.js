'use strict';

const stampit = require('stampit');

const Node = stampit({
  statics: {
    type: 'node',
  },
  props: {
    type: null,
    location: null,
    children: [],
  },
  init({ location = this.location, children = this.children }, { stamp }) {
    this.type = stamp.type;
    this.location = location;
    this.children = children;
  },
});

module.exports = Node;
