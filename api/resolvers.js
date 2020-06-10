const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "superJWTSecret";
const CONNECTION_STRING = process.env.CONNECTION_STRING;
console.log("ENVIRONMENT", process.env);

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  fullname: String,
  age: String,
  email: String,
  password: String,
});

const Tweet = mongoose.model("Tweet", {
  userId: String,
  message: String,
});

const Followed = mongoose.model("Followed", {
  userId: String,
  followedId: String,
});

const resolvers = {
  Query: {
    user: (_, args, context, info) => {
      console.log("QueryUser", { args });
      return User.findById(args.id);
    },
    users: () => User.find(),
    me: (root, args, context, info) => {
      const authUser = context.user;
      if (!authUser) throw new Error("Unauthorized");
      return User.findById(authUser._id);
    },
  },
  Mutation: {
    createTweet: (_, { input: { message } }, context) => {
      Tweet.create({
        userId: context.user._id,
        message,
      });
    },

    register: async (_, { input }) => {
      const user = await new User(input).save();
      const { _id, email, fullname } = user;
      const token = jwt.sign({ _id, email, fullname }, JWT_SECRET);
      user.token = token;
      return user;
    },
    login: async (_, { input: { email, password } }) => {
      const user = await User.findOne({ email });
      // TODO improve add SALT
      if (user && password == user.password) {
        const { _id, email, fullname } = user;
        const token = jwt.sign({ _id, email, fullname }, JWT_SECRET);
        user.token = token;
        return user;
      } else {
        throw new Error("Unauthorized");
      }
    },
  },
  User: {
    tweets: (user) => {
      return Tweet.find({ userId: user.id });
    },
    followed: async (user) => {
      const followedIds = await Followed.find({
        userId: user.id,
      }).then((followed) => followed.map((x) => x.followedId));
      return User.find({ _id: followedIds });
    },
  },
};

module.exports = resolvers;
