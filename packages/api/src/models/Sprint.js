"use strict";

module.exports = (sequelize, Sequelize) => {
  class Sprint extends Sequelize.Model {}
  Sprint.init(
    {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "ProjectSprint"
      },
      description: Sequelize.STRING,
      color: Sequelize.STRING,
      status: Sequelize.STRING,
      deadline: Sequelize.DATE,
      projectUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: "ProjectSprint"
      }
    },
    { sequelize, modelName: "sprint" }
  );

  return Sprint;
};
