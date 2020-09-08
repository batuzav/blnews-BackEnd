const User = require("../../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { updateUserTokkenApp } = require("../resolvers/users");

module.exports = {
  login: async ({ dibNumber, password, tokkenApp }) => {
    const user = await User.findOne({ dibNumber });
    if (!user) {
      throw new Error("Usuario no existe");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("PASSWORD INCORRECTO");
    }
    const token = jwt.sign(
      { userId: user._id, dibNumber: user.dibNumber },
      `${process.env.tokencrypt}`,
      {
        expiresIn: "4h",
      }
    );
    const newUser = await updateUserTokkenApp({ id: user._id, tokkenApp });
    return {
      userId: user._id,
      token,
      tokeExpiration: 1,
      user: newUser,
    };
  },
  checkLogin: async (args, req) => {
    let isAuth = true;
    console.log(" en resolvers req: ", req.isAuth);
    if (!req.isAuth) {
      isAuth = false;
    }
    return { isAuth };
  },
};
