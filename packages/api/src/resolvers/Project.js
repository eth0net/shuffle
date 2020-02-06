"use strict";

module.exports = {
  owner: project => project.getOwner(),
  members: project => project.getMembers(),
  sprints: project => project.getSprints()
};
