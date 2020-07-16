const usersResolver = require("./users/users");
const authResolver = require("./auth/auth");

const rootResolver = {
  ...usersResolver,
  ...authResolver,
};

module.exports = rootResolver;
