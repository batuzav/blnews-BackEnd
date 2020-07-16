const express = require("express");
const app = express();
const graphqlHttp = require("express-graphql");

const graphQlSchema = require("./schema/index");
const graphQlResolvers = require("./resolvers/index");

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

module.exports = app;
