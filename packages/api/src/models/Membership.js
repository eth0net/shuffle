"use strict";

module.exports = (sequelize, Sequelize) => {
  class Membership extends Sequelize.Model {
    getGroup(opts) {
      const type = this.get("groupType");
      return this["get" + type[0].toUpperCase() + type.substr(1)](opts);
    }
    getMember(opts) {
      const type = this.get("memberType");
      return this["get" + type[0].toUpperCase() + type.substr(1)](opts);
    }
  }
  Membership.init(
    {
      groupType: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "GroupMember"
      },
      groupUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: "GroupMember"
      },
      memberType: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: "GroupMember"
      },
      memberUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: "GroupMember"
      }
    },
    { sequelize, modelName: "membership" }
  );

  return Membership;
};
