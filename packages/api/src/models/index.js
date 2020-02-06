"use strict";

module.exports = (sequelize, Sequelize) => {
  const Team = require("./Team")(sequelize, Sequelize);
  const User = require("./User")(sequelize, Sequelize);
  const Project = require("./Project")(sequelize, Sequelize);
  const Sprint = require("./Sprint")(sequelize, Sequelize);
  const List = require("./List")(sequelize, Sequelize);
  const Task = require("./Task")(sequelize, Sequelize);
  const Comment = require("./Comment")(sequelize, Sequelize);
  const Membership = require("./Membership")(sequelize, Sequelize);

  // Team owner
  // Team.Owner = Team.belongsTo(User, { as: "owner", foreignKey: "ownerUuid" });
  Team.belongsTo(User, { as: "owner", foreignKey: "ownerUuid" });

  // Team members
  Team.belongsToMany(User, {
    as: "members",
    through: {
      model: Membership,
      scope: { groupType: "team", memberType: "user" }
    },
    foreignKey: "groupUuid",
    constraints: false
  });
  User.belongsToMany(Team, {
    as: "teams",
    through: {
      model: Membership,
      scope: { groupType: "team", memberType: "user" }
    },
    foreignKey: "memberUuid",
    constraints: false
  });

  // Project owner
  Team.hasMany(Project, {
    constraints: false,
    foreignKey: "ownerUuid",
    scope: { ownerType: "team" }
  });
  User.hasMany(Project, {
    constraints: false,
    foreignKey: "ownerUuid",
    scope: { ownerType: "user" }
  });
  Project.belongsTo(Team, { constraints: false, foreignKey: "ownerUuid" });
  Project.belongsTo(User, { constraints: false, foreignKey: "ownerUuid" });

  // Project members
  Team.belongsToMany(Project, {
    through: {
      model: Membership,
      scope: { groupType: "project", memberType: "team" }
    },
    foreignKey: "memberUuid",
    constraints: false
  });
  User.belongsToMany(Project, {
    through: {
      model: Membership,
      scope: { groupType: "project", memberType: "user" }
    },
    foreignKey: "memberUuid",
    constraints: false
  });
  Project.belongsToMany(Team, {
    through: {
      model: Membership,
      scope: { groupType: "project", memberType: "team" }
    },
    foreignKey: "groupUuid",
    constraints: false
  });
  Project.belongsToMany(User, {
    through: {
      model: Membership,
      scope: { groupType: "project", memberType: "user" }
    },
    foreignKey: "groupUuid",
    constraints: false
  });

  // Project sprints
  Project.hasMany(Sprint);
  Sprint.belongsTo(Project);

  // Sprint lists
  Sprint.hasMany(List);
  List.belongsTo(Sprint);

  // List tasks
  Task.belongsTo(List, { constraints: false, foreignKey: "parentUuid" });
  List.hasMany(Task, {
    constraints: false,
    foreignKey: "parentUuid",
    scope: { parentType: "list" }
  });

  // Subtasks
  Task.belongsTo(Task, { constraints: false, foreignKey: "parentUuid" });
  Task.hasMany(Task, {
    constraints: false,
    foreignKey: "parentUuid",
    scope: { parentType: "task" }
  });

  // Comments
  Comment.belongsTo(Task, { constraints: false, foreignKey: "parentUuid" });
  Task.hasMany(Comment, {
    constraints: false,
    foreignKey: "parentUuid",
    scope: { parentType: "task" }
  });

  // Replies
  Comment.belongsTo(Comment, { constraints: false, foreignKey: "parentUuid" });
  Comment.hasMany(Comment, {
    constraints: false,
    foreignKey: "parentUuid",
    scope: { parentType: "comment" }
  });

  // update database with current models
  // sequelize.sync();
  sequelize.sync({ force: true });

  return {
    sequelize,
    Sequelize,
    Team,
    User,
    Project,
    Sprint,
    List,
    Task,
    Comment
  };
};
