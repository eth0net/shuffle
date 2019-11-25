// Team resolver
module.exports = {
  owner: team => team.getOwner(),
  members: team => team.getMembers()
};
