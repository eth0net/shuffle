"use strict";

module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {}
  User.init(
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
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    { sequelize, modelName: "user" }
  );
  return User;
};
