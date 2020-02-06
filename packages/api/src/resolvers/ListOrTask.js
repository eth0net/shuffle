"use strict";

module.exports = {
  __resolveType(root) {
    if (root.sprint) return "List";
    else return "Task";
  }
};