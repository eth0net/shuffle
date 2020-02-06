"use strict";

module.exports = {
  teams: (root, args, ctx, info) => ctx.store.Team.findAll(),
  users: (root, args, ctx, info) => ctx.store.User.findAll(),
  projects: (root, args, ctx, info) => ctx.store.Project.findAll(),
  sprints: (root, args, ctx, info) => ctx.store.Sprint.findAll(),
  lists: (root, args, ctx, info) => ctx.store.List.findAll(),
  tasks: (root, args, ctx, info) => ctx.store.Task.findAll(),
  comments: (root, args, ctx, info) => ctx.store.Comment.findAll()
};
