const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("AUTH:", req.headers.authorization);
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[0];
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
  console.log("REQ EN MIDDLEWARE", req.isAuth);
  req.isAuth = true;
  req.userID = decodedToken.userId;
  next();
};
