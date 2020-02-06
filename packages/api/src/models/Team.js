"use strict";

module.exports = (sequelize, Sequelize) => {
  class Team extends Sequelize.Model {}
  Team.init(
    {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: Sequelize.STRING,
      ownerUuid: {
        type: Sequelize.UUID,
        allowNull: false
      }
    },
    { sequelize, modelName: "team" }
  );

  return Team;
};
