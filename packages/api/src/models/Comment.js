"use strict";

module.exports = (sequelize, Sequelize) => {
  class Comment extends Sequelize.Model {}
  Comment.init(
    {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      parentType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      parentUuid: {
        type: Sequelize.UUID,
        allowNull: false
      }
    },
    { sequelize, modelName: "comment" }
  );

  return Comment;
};
