"use strict";

module.exports = {
  parent: comment => comment.getParent(),
  replies: comment => comment.getComments()
};
