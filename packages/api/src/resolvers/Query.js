const models = require("../store");

// Query resolver
module.exports = {
  teams: () => models.Team.findAll(),
  users: () => models.User.findAll()
};
