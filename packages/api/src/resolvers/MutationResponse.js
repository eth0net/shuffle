"use strict";

module.exports = {
  __resolveType(root) {
    if (root.token && root.user) return "Auth";
    else if (root.team) return "Team";
    else if (root.user) return "User";
    else if (root.project) return "Project";
    else if (root.sprint) return "Sprint";
    else if (root.list) return "List";
    else if (root.task) return "Task";
    else if (root.comment) return "Comment";
    else return null;
  }
};