const { gql } = require("apollo-server-micro");
const typeDefs = gql`
  type Query {
    user(id: ID!): User
    users: [User]

    # feed son los tweets de la gente que sigo
    feed: [Tweet]

    # devuelve el usuario de la sesion actual
    me: User
  }

  type User {
    id: String
    fullname: String!
    age: String!
    email: String!
    token: String
    tweets: [Tweet]
    followed: [User]
  }

  #Quiero ver los tweets de la gente que sigo

  type Tweet {
    id: String!
    message: String!
    createdAt: String!
    user: User!
  }

  type Mutation {
    register(input: RegisterInput!): User!
    login(input: LoginInput!): User!
  }

  input RegisterInput {
    fullname: String!
    age: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;

// export default typeDefs;
module.exports = typeDefs;
