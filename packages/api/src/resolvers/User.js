// User resolver
module.exports = {
  teams: user => user.getMembers()
};
