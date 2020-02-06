"use strict";

const { GraphQLDateTime } = require("graphql-iso-date");

module.exports = {
  Query: require("./Query"),
  Mutation: require("./Mutation"),
  DateTime: GraphQLDateTime,
  UUID: require("graphql-type-uuid"),
  Team: require("./Team"),
  User: require("./User"),
  Project: require("./Project"),
  Sprint: require("./Sprint"),
  List: require("./List"),
  Task: require("./Task"),
  Comment: require("./Comment"),
  TeamOrUser: require("./TeamOrUser"),
  ListOrTask: require("./ListOrTask"),
  TaskOrComment: require("./TaskOrComment"),
  MutationResponse: require("./MutationResponse"),
};
