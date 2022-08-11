const { User } = require('../models');
const { signToken }= require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            } 
            throw new AuthenticationError("Can't find user");
        },
    },
}