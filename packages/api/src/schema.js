"use strict";

const { gql } = require("apollo-server-koa");

module.exports = gql`
  "Query operations supported by the API."
  type Query {
    "Query teams."
    teams: [Team]
    "Query users."
    users: [User]
    "Query projects."
    projects: [Project]
    "Query sprints."
    sprints: [Sprint]
    "Query lists."
    lists: [List]
    "Query tasks."
    tasks: [Task]
    "Query comments."
    comments: [Comment]
  }

  "Mutation operations supported by the API."
  type Mutation {
    "Signup for API access."
    signup(name: String!, password: String!): AuthMutationResponse
    "Login and get API token."
    login(name: String!, password: String!): AuthMutationResponse
    "Create a new team."
    createTeam(opts: CreateTeamInput!): TeamMutationResponse
    # "Update a team."
    # updateTeam(teamId: ID!, opts: UpdateTeamInput!): TeamMutationResponse
    "Create a new project."
    createProject(opts: CreateProjectInput!): ProjectMutationResponse
  }

  # Custom types

  scalar DateTime
  scalar UUID

  # Type interfaces

  """
  A type that can be assigned.
  For example: Tasks can be assigned to Users.
  """
  interface Assignment {
    color: String
    deadline: DateTime
    status: String
    assignees: [Assignee]
  }

  """
  A type that can have assignments.
  For example: Users can have Tasks assigned to them.
  """
  interface Assignee {
    "The assignments for this assignee."
    assignments: [Assignment]
  }

  # Main objects

  "A team of users for collaboration."
  type Team implements Assignee {
    "The uuid of this team."
    uuid: UUID!
    "The name of this team."
    name: String!
    "A short description for this team."
    description: String
    "The user that owns this team."
    owner: User!
    "The teams that this team is a member of."
    teams: [Team]
    "The users that are members of this team."
    members: [User]
    "The projects owned by this team."
    projects: [Project]
    "The assignments for this team."
    assignments: [Assignment]
  }

  "An API user."
  type User implements Assignee {
    "The uuid of this user."
    uuid: UUID!
    "The name of this user."
    name: String!
    "The teams this user is a member of."
    teams: [Team]
    "The projects owned by this user."
    projects: [Project]
    "The assignments for this user."
    assignments: [Assignment]
  }

  "Project details."
  type Project {
    "The uuid of this project."
    uuid: UUID!
    "The name of this project."
    name: String!
    "A short description for this project."
    description: String
    "The team/user that owns this project."
    owner: TeamOrUser!
    "The teams/users that are members of this project."
    members: [TeamOrUser]
    "The sprints in this project."
    sprints: [Sprint]
  }

  """
  A section within the parent project.
  Can be used to help divide the prokject into related parts.
  For example: Server and Client within an application project.
  """
  type Sprint implements Assignment {
    "The id of this sprint."
    uuid: UUID!
    "The name of this sprint."
    name: String!
    "A short description for this sprint."
    description: String
    "The interface color for this sprint."
    color: String
    "The deadline for this sprint."
    deadline: DateTime
    "The current status of this sprint."
    status: String
    "The parent project for this sprint."
    project: Project!
    "The teams/users that are assigned to this sprint."
    assignees: [Assignee]
    "The lists in this sprint."
    lists: [List]
  }

  """
  A list of tasks within the parent sprint.
  Can be used to show progress within a sprint.
  """
  type List implements Assignment {
    "The id of this list."
    uuid: UUID!
    "The name of this list."
    name: String!
    "A short description for this list."
    description: String
    "The interface color for this list."
    color: String
    "The deadline for this list."
    deadline: DateTime
    "The current status of this list."
    status: String
    "The parent sprint for this list."
    sprint: Sprint!
    "The teams/users assigned to this list."
    assignees: [Assignee]
    "The tasks in this list."
    tasks: [Task]
  }

  """
  A task within the parent list/task.
  Can contain sub-tasks as well as comments.
  """
  type Task implements Assignment {
    "The id of this task."
    uuid: UUID!
    "The name of this task."
    name: String!
    "A short description for this task."
    description: String
    "The interface color for this task."
    color: String
    "The deadline for this task."
    deadline: DateTime
    "The current status of this task."
    status: String
    "The parent list/task of this task."
    parent: ListOrTask
    "The teams/users assigned to this task."
    assignees: [Assignee]
    "The sub-tasks for this task."
    subtasks: [Task]
    "The comments on this task."
    comments: [Comment]
  }

  "A comment on a task/comment."
  type Comment {
    "The id of this comment."
    uuid: UUID!
    "The user who wrote this comment."
    author: User!
    "The comment string."
    content: String!
    "The parent task/comment of this comment."
    parent: TaskOrComment
    "The replies to this comment."
    replies: Comment
  }

  """
  Can be team or user.
  For ownership/membership and assignee.
  """
  union TeamOrUser = Team | User
  """
  Can be list or task.
  For task parent.
  """
  union ListOrTask = List | Task
  """
  Can be task or comment.
  For comment parent.
  """
  union TaskOrComment = Task | Comment

  "Valid node types."
  enum NodeTypeEnum {
    Team
    User
    Project
    Sprint
    List
    Task
    Comment
  }

  "Input for polymorph association."
  input NodeInput {
    "The id of the node."
    uuid: UUID!
    "The type of the node."
    type: NodeTypeEnum!
  }

  "Input for createTeam mutation."
  input CreateTeamInput {
    "The name of this team."
    name: String!
    "A short description for this team."
    description: String
    "The node that will own this team."
    owner: NodeInput
    "The nodes in this team."
    members: [NodeInput]
  }

  "Input for createProject mutation."
  input CreateProjectInput {
    "The name of this team."
    name: String!
    "A short description for this team."
    description: String
    "The node that will own this project."
    owner: NodeInput
    "The nodes in this team."
    members: [NodeInput]
  }

  "Interface for generic mutation response."
  interface MutationResponse {
    "Indicates the success of the operation."
    success: Boolean!
    "A string for user feedback about the operation."
    message: String!
  }

  "Response for a team mutation."
  type TeamMutationResponse implements MutationResponse {
    "Indicates the success of the operation."
    success: Boolean!
    "A string for user feedback about the operation."
    message: String!
    "The newly created team."
    team: Team
  }

  "Response for a project mutation."
  type ProjectMutationResponse implements MutationResponse {
    "Indicates the success of the operation."
    success: Boolean!
    "A string for user feedback about the operation."
    message: String!
    "The newly created project."
    project: Project
  }

  "Response for an authentication mutation."
  type AuthMutationResponse implements MutationResponse {
    "Indicates the success of the operation."
    success: Boolean!
    "A string for user feedback about the operation."
    message: String!
    "The authentication token."
    token: String
    "The authenticated user."
    user: User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
