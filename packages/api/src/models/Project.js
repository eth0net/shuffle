"use strict";

module.exports = (sequelize, Sequelize) => {
  class Project extends Sequelize.Model {
    getOwner(opts) {
      const type = this.get("ownerType");
      return this["get" + type[0].toUpperCase() + type.substr(1)](opts);
    }
  }
  Project.init(
    {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "OwnerProject"
      },
      description: Sequelize.STRING,
      ownerType: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "OwnerProject"
      },
      ownerUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: "OwnerProject"
      }
    },
    { sequelize, modelName: "project" }
  );
  
  return Project;
};
