const { ApolloServer, gql } = require("apollo-server");

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

const users = [
  {
    id: "1234",
    fullname: "John doe",
    age: "25",
    email: "john@email.com",
  },
];

const resolvers = {
  Query: {
    user: (_, args, context, info) => {
      console.log("QueryUser", { args });
      return users.find((x) => x.id === args.id);
    },
    users: () => users,
  },

  Mutation: {
    register: (_, { input }) => {
      console.log("Register", input);
      const user = { id: new Date(), ...input };
      users.push(user); //Insert in DB
      return user;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
