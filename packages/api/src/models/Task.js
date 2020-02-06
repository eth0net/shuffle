"use strict";

module.exports = (sequelize, Sequelize) => {
  class Task extends Sequelize.Model {}
  Task.init(
    {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "ParentTask"
      },
      description: Sequelize.STRING,
      color: Sequelize.STRING,
      status: Sequelize.STRING,
      deadline: Sequelize.DATE,
      parentType: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "ParentTask"
      },
      parentUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: "ParentTask"
      }
    },
    { sequelize, modelName: "task" }
  );

  return Task;
};
