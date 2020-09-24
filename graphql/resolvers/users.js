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
          countriesToSee: args.userInput.countriesToSee,
          img: args.userInput.img,
          active: args.userInput.active,
        });
        return user.save();
      })
      .then((result) => {
        // console.log(result);
        return { ...result._doc, _id: result._doc._id.toString() };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  getUsersByCountries: ({ countries }) => {
    console.log("countries", countries);
    return User.find({ active: true }).then((users) => {
      return users.map((user) => {
        const inside = arraysContains(countries, user.countriesToSee);
        if (inside) return { ...user._doc, _id: user.id };
      });
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

  changeCountriesToSee: async ({ dibNumber, countriesToSee }) => {
    let isChange = true;
    const userdb = await User.findOneAsync({ dibNumber }).then((user) => {
      return user;
    });
    console.log("userdb", userdb);
    if (!userdb) {
      isChange = false;
      return { isChange };
    }
    return User.findOneAndUpdate(
      { dibNumber },
      { countriesToSee },
      { new: true }
    ).then((newUser) => {
      return { isChange, newUser };
    });
  },
};

const arraysContains = (_arr1, _arr2) => {
  if (!Array.isArray(_arr1) || !Array.isArray(_arr2)) return false;
  var arr1 = _arr1.concat().sort();
  var arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        return true;
      }
    }
  }
  return false;
};
