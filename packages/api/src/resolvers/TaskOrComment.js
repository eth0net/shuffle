"use strict";

module.exports = {
  __resolveType(root) {
    if (root.content) return "Comment";
    else return "Task";
  }
};