"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = "iamasecretaskmenothing";

async function signup(root, args, ctx, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await ctx.store.User.create({ ...args, password });
  const token = jwt.sign({ uuid: user.uuid, roles: [] }, secret);

  return {
    success: true,
    message: "Signup successful.",
    token,
    user
  };
}

async function login(root, args, ctx, info) {
  const user = await ctx.store.User.findOne({ where: { name: args.name } });
  if (!user) throw new Error("No user exists with that name.");

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error("Invalid password.");

  const token = jwt.sign({ uuid: user.uuid, roles: [] }, secret);

  return {
    success: true,
    message: "Login successful.",
    token,
    user
  };
}

async function createTeam(root, { opts }, ctx, info) {
  // check for id provided by valid authentication
  if (!((ctx.state || {}).user || {}).uuid) {
    return {
      success: false,
      message: "You are not authenticated.",
      team: null
    };
  }

  // get ownerId and check the user exists
  const ownerUuid = ((opts || {}).owner || {}).uuid || ctx.state.user.uuid;
  const ownerType = ((opts || {}).owner || {}).type || "user";
  const ownerTypeUp =
    ownerType[0].toUpperCase() + ownerType.substr(1).toLowerCase();
  const owner = await ctx.store[ownerTypeUp].findByPk(ownerUuid);
  if (!owner) {
    return {
      success: false,
      message: `Error: No ${ownerType} with UUID ${ownerUuid}.`,
      team: null
    };
  }

  // collate memberIds
  const members = Array.from(opts.members || []);
  members.push({ memberUuid: ownerUuid, memberType: ownerType });

  // attempt to create the team
  const team = await ctx.store.Team.create({
    ...opts,
    ownerUuid
  });
  await team.setMembers([owner]);

  return {
    success: true,
    message: `Successfully created team: ${opts.name}`,
    team
  };
}

async function createProject(root, { opts }, ctx, info) {
  // check for id provided by valid authentication
  if (!((ctx.state || {}).user || {}).uuid) {
    return {
      success: false,
      message: "You are not authenticated.",
      team: null
    };
  }

  // get ownerId and check the user exists
  const ownerUuid = (opts.owner || {}).uuid || ctx.state.user.uuid;
  const ownerType = (opts.owner || {}).type
    ? opts.owner.type[0] + opts.owner.type.substr(1).toLowerCase()
    : "User";
  const owner = await ctx.store[ownerType].findByPk(ownerUuid);
  if (!owner) {
    return {
      success: false,
      message: `Error: No ${ownerType} with UUID ${ownerUuid}.`,
      team: null
    };
  }

  // collate memberIds
  const memberUuids = Array.from(opts.members || []);
  memberUuids.push(ownerUuid);

  // attempt to create the project
  const project = await ctx.store.Project.create({
    ...opts,
    ownerUuid,
    ownerType
  });
  await project.setMembers(memberUuids);

  return {
    success: true,
    message: `Successfully created project: ${opts.name}`,
    project
  };
}

module.exports = { signup, login, createTeam, createProject };
