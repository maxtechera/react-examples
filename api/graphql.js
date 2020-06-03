const cors = require("micro-cors")(); // highlight-line
const { ApolloServer, gql } = require("apollo-server-micro");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const handler = apolloServer.createHandler({
  path: "/api/graphql",
}); // highlight-line
module.exports = cors((req, res) =>
  req.method === "OPTIONS" ? res.end() : handler(req, res)
); // highlight-line
