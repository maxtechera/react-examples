const mongoose = require("mongoose");
const CONNECTION_STRING =
  process.env.CONNECTION_STRING ||
  `mongodb+srv://webUser:webPassword@web-cluster-ubhcy.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  fullname: String,
  age: String,
  email: String,
});

const resolvers = {
  Query: {
    user: (_, args, context, info) => {
      console.log("QueryUser", { args });
      return User.findById(args.id);
    },
    users: () => User.find(),
  },
  Mutation: {
    register: (_, { input }) => {
      const user = new User(input);
      return user.save();
    },
  },
};

// export default resolvers;
module.exports = resolvers;
