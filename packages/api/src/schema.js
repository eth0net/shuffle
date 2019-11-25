const { gql } = require("apollo-server");

const typeDefs = gql`
  # union Member = Team | User

  type Team {
    id: ID!
    name: String!
    owner: User!
    # members: [Member]
    members: [User]
  }

  type User {
    id: ID!
    name: String!
    teams: [Team]
  }

  type Query {
    "Get team data"
    teams: [Team]
    "Get user data"
    users: [User]
  }

  type Mutation {
    "Create a new team"
    createTeam(opts: CreateTeamInput!): CreateTeamMutationResponse
  }

  input CreateTeamInput {
    "The name of this team"
    name: String!
    "The id of the user who will own this team"
    owner: String!
    "The list of ids for users in this team"
    members: [String]
  }

  interface MutationResponse {
    "Indicates whether the operation was succesful"
    success: Boolean!
    "A string for user feedback about the operation"
    message: String!
  }

  type CreateTeamMutationResponse implements MutationResponse {
    "Indicates whether the operation was succesful"
    success: Boolean!
    "A string for user feedback about the operation"
    message: String!
    "The newly created team data"
    team: Team
  }
`;

module.exports = typeDefs;