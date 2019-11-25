const fs = require("fs");
const Sequelize = require("sequelize");

// define store config
let config;
try {
  config = fs.readFileSync("shuffle.config.js");
} catch (e) {
  console.log(`No config file found - using default store: store.sqlite`);
  config = { dialect: "sqlite", storage: "store.sqlite" };
}

// setup database connection
const db = new Sequelize(config);
db.authenticate()
  .then(() => console.log("Successfully connected to the database"))
  .catch(e => console.log(`Failed to connect to the database: ${e}`));

// define database models
const Team = db.define("team", {
  name: { type: Sequelize.STRING, allowNull: false }
});
const User = db.define("user", {
  name: { type: Sequelize.STRING, allowNull: false }
});

Team.Owner = Team.belongsTo(User, { as: "owner" });

Team.Members = Team.belongsToMany(User, {
  as: "members",
  through: "team_members",
  constraints: false
});
User.Teams = User.belongsToMany(Team, {
  as: "members",
  through: "team_members",
  constraints: false
});

// // update database with current models
// db.sync({ force: true }).then(() =>
//   Team.create(
//     { name: "devs", owner: { name: "raz" }, members: [{ name: "juicy" }] },
//     { include: [Team.Owner, Team.Members] }
//   )
// );

module.exports = { Team, User };

// TODO: move models out to other files for import './models'