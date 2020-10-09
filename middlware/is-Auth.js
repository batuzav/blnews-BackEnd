const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  req.isAuth = true;
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
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.userID = decodedToken.userId;
  next();
};
