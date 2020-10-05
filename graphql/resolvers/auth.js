const User = require("../../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { updateUserTokkenApp } = require("../resolvers/users");
const {
  knowDIBIsACtive,
  RegisterDibInApp,
} = require("../../XirectDB/XirectDBConect");

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
    // const isActive = await knowDIBIsACtive({ dibNumber });
    // if (!isActive) {
    //   throw new Error("Usuario no Activo");
    // }
    const token = jwt.sign(
      { userId: user._id, dibNumber: user.dibNumber },
      `${process.env.tokencrypt}`,
      {
        expiresIn: "365d",
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

  loginDashboard: async ({ email, password }) => {},
  checkLogin: async (args, req) => {
    let isAuth = true;
    let uid = "";
    let user = {};
    if (!req.isAuth) {
      isAuth = false;
    }
    if (req.userID) {
      uid = req.userID;
      user = findOneAsync({ _id: uid }).then((user) => {
        return user;
      });
      if (!user) {
        user = {};
      }
    }

    return { isAuth, uid, user };
  },
  registerByApp: async (args) => {
    const { dibNumber, password, confirmPassword } = args.registerByAppInput;
    let isRegister = true;
    if (password !== confirmPassword) {
      throw new Error("Contraseñas no son identicas...");
    }
    const existingUser = await User.findOneAsync({ dibNumber }).then((user) => {
      return user;
    });
    if (existingUser) {
      throw new Error("Usuario ya existe...");
    }
    const {
      firstName,
      lastName,
      status,
      MarketName,
      img,
      phone,
      email,
    } = await RegisterDibInApp({
      dibNumber,
    });
    if (status !== 2) {
      throw new Error("Usuario no activo");
    }
    const countriesToSee = [transformCountries(MarketName)];
    const hashedPassword = await bcrypt
      .hash(password, 12)
      .then((Pass) => {
        return Pass;
      })
      .catch((err) => {
        throw err;
      });
    const currentUser = new User({
      dibNumber,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      timezone: "none",
      phone,
      countriesToSee,
      img,
      active: true,
    });
    const savedUser = await currentUser.save();
    if (!savedUser) {
      isRegister = false;
    }
    return { isRegister };
  },
};

const transformCountries = (MarketName) => {
  switch (MarketName) {
    case "México":
      return "MEX";
    case "Perú":
      return "PER";
    case "El Salvador":
      return "SAL";
    case "Bolivia":
      return "BOL";
    case "Panamá":
      return "PAN";
    default:
      return "USA";
  }
};
