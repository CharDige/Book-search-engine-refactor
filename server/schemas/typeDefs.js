const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]!
    }
    
    type Book {
       bookId: ID
       authors: [String]
       description: String
       title: String
       image: String
       link: String
    }
    
    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
    }

    input SavedBooks {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(book: SavedBooks!): User 
        removeBook(bookId: ID!): User
    }`

    module.exports = typeDefs;