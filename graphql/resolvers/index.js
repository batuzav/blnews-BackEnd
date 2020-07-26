const usersResolver = require("./users/users");
const authResolver = require("./auth/auth");
const contactsResolver = require("./contacts/contacts");
const campaignResolver = require("./campaign");

const rootResolver = {
  ...usersResolver,
  ...authResolver,
  ...contactsResolver,
  ...campaignResolver,
};

module.exports = rootResolver;
