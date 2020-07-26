const { buildSchema } = require("graphql");

module.exports = buildSchema(`
scalar Date


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

  type Contact {
    _id: ID!
    title: String!
    contact: String!
    type: Int!
  }

  input ContactInput {
    title: String!
    contact: String!
    type: Int!
  }

  type Campaign {
    _id: ID!
    title: String!
    subtitle: String!
    description: String!
    country: [String!]
    img: String!
    timezone: String!
    startDate: Date!
    endDate: Date!
    allUsers: Boolean!
    status: Int!
    category: [String!]
  }

  input CampaignInput {
    title: String!
    subtitle: String!
    description: String!
    country: [String!]
    img: String!
    timezone: String!
    startDate: Date!
    endDate: Date!
    allUsers: Boolean!
    status: Int!
    category: [String!]
  }

  type tokenAuth {
      isAuth: Boolean!
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

  type RootQuery {
      users: [User!]!
      login(dibNumber: String!, password: String!): AuthData!
      checkLogin: tokenAuth!
      Campaigns: [Campaign!]!
      getCampaignsByCategory(category: String!):[Campaign!]!


  }
  
  type RootMutation {
    createUser(userInput: UserInput): User
    createContact(contactInput: ContactInput!): Contact
    createCampaign(campaignInput: CampaignInput): Campaign

  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }

`);
