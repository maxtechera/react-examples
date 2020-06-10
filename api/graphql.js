const cors = require("micro-cors")(); // highlight-line
const { ApolloServer, gql } = require("apollo-server-micro");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "superJWTSecret";
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => {
    try {
      const user = getUserFromRequest(req);
      return {
        user,
      };
    } catch (error) {
      console.log("NoUserAuthorized");
    }
    return {};
  },
});

const getUserFromRequest = ({ req }) => {
  const authHeader = req.headers.authorization;
  const [, token] = authHeader.split(" ");
  const user = jwt.verify(token, JWT_SECRET);
  return user;
};

const handler = apolloServer.createHandler({
  path: "/api/graphql",
}); // highlight-line

module.exports = cors((req, res) =>
  req.method === "OPTIONS" ? res.end() : handler(req, res)
); // highlight-line
