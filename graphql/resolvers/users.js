const User = require("../../models/usersModel");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: (args) => {
    return User.findOne({ dibNumber: args.userInput.dibNumber })
      .then((user) => {
        if (user) {
          throw new Error("USUARIO YA EXISTE");
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          dibNumber: args.userInput.dibNumber,
          password: hashedPassword,
          firstName: args.userInput.firstName,
          lastName: args.userInput.lastName,
          email: args.userInput.email,
          timezone: args.userInput.timezone,
          phone: args.userInput.phone,
        });
        return user.save();
      })
      .then((result) => {
        console.log(result);
        return { ...result._doc, _id: result._doc._id.toString() };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  updateUserTokkenApp: async ({ id, tokkenApp }) => {
    const userdb = await User.findOneAsync({ _id: id }).then((user) => {
      return user;
    });
    console.log("letras: ", userdb);
    if (!userdb) {
      throw new Error("USUARIO NO EXISTE.");
    }

    if (userdb.tokkenApp === tokkenApp) {
      return userdb;
    } else {
      return User.findOneAndUpdate(
        { _id: id },
        { tokkenApp },
        { new: true }
      ).then((result) => {
        return result;
      });
    }
  },
};