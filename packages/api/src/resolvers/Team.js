"use strict";

module.exports = {
  owner: team => team.getOwner(),
  teams: team => team.getTeams(),
  members: team => team.getMembers(),
  projects: team => team.getProjects()
};
