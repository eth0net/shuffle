"use strict";

module.exports = (sequelize, Sequelize) => {
  class List extends Sequelize.Model {}
  List.init(
    {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "SprintList"
      },
      description: Sequelize.STRING,
      color: Sequelize.STRING,
      status: Sequelize.STRING,
      deadline: Sequelize.DATE,
      sprintUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: "SprintList"
      }
    },
    { sequelize, modelName: "list" }
  );

  return List;
};
