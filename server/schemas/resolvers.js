const { User } = require('../models');
const { signToken }= require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // Find a single user
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            } 
            throw new AuthenticationError("Can't find user");
        },
    },
    Mutation: {
        // Add a user
        addUser: async (parent, { username, email, password }) => {
           const user = await User.create({ username, email, password });
           const token = signToken(user);
           return { token, user }; 
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email or password, please try again');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect email or password, please try again');
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('Could not save this book');
        }
    }
}