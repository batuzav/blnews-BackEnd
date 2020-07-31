const usersResolver = require("./users");
const authResolver = require("./auth");
const contactsResolver = require("./contacts");
const campaignResolver = require("./campaign");

const rootResolver = {
  ...usersResolver,
  ...authResolver,
  ...contactsResolver,
  ...campaignResolver,
};

module.exports = rootResolver;
