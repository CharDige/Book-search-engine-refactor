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
        }
    }
}