"use strict";

module.exports = {
  parent: task => task.getParent(),
  subtasks: task => task.getTasks(),
  comments: task => task.getComments()
};
