const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: Int
    email: String
    password: String
    confirmpassword: String
    token: String
  }

  type Query {
    getUserData: [User!]!
    getAllUser(id: Int!): User
  }

  type Mutation {
    createUser(email: String!, password: String!, confirmpassword: String!): User
    loginUser(email: String!, password: String!): User
    updateUser(id: Int!, email: String!, password: String!): User
    deleteUser(id: Int!, email: String!, password: String!): User
  }
`;