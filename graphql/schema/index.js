const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    user: User
    _id: ID!
  }

type User {
    _id: ID!
    dibNumber: String!
    password: String
    firstName: String!
    lastName: String!
    email: String!
    timezone: String!
    phone: String!
  }

  type tokenAuth {
      isAuth: Boolean!
  }



  type RootQuery {
      users: [User!]!
      login(dibNumber: String!, password: String!): AuthData!
      checkLogin: tokenAuth!


  }
  input UserInput {
    dibNumber: String!
    password: String!
    firstName: String!
    lastName: String!
    email: String!
    timezone: String!
    phone: String!
  }
  type RootMutation {
    createUser(userInput: UserInput): User

  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }

`);
