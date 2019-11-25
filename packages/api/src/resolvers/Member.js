// Member resolver
module.exports = {
  __resolveType(root) {
    if (root.members) return "Team";
    else return "User";
  }
};