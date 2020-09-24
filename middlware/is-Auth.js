const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  req.isAuth = true;
  console.log("req", req.isAuth);
  if (!authHeader) {
    console.log("req.isAuth !", req.isAuth);
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[0];
  console.log("token", token);
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  try {
    decodedToken = jwt.verify(token, `${process.env.tokencrypt}`);
  } catch (err) {
    console.log("err ", err);
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  console.log("REQ EN MIDDLEWARE", token);
  req.userID = decodedToken.userId;
  next();
};
