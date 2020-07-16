const User = require("../../../models/Users/usersModel");
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
          lastName: +args.userInput.lastName,
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
};
