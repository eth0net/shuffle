"use strict";

const Koa = require("koa");
const jwt = require("koa-jwt");
const { ApolloServer } = require("apollo-server-koa");

// server config
const PORT = 4000;

// setup database
const store = require("./store");

// load the schema and resolvers
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// create the apollo server with config
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ctx}) => {
    return { ...ctx, store };
  }
});

// create koa app server
const app = new Koa();

// authentication middleware adds to ctx.state.user
app.use(jwt({ secret: "iamasecretaskmenothing", passthrough: true }));

// add apollo middleware on /gql path
apollo.applyMiddleware({ app, path: "/gql" });

// start up the server on port 4000
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
