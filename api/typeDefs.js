const { gql } = require("apollo-server-micro");
const typeDefs = gql`
  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    register(input: RegisterInput!): User!
  }

  type User {
    id: String
    fullname: String!
    age: String!
    email: String!
  }

  input RegisterInput {
    fullname: String!
    age: String!
    email: String!
    password: String!
  }
`;

// export default typeDefs;
module.exports = typeDefs;
