const { ApolloServer } = require("apollo-server");

// load the schema and resolvers
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// create the apollo server with config
const server = new ApolloServer({ typeDefs, resolvers });

// start up the api server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
