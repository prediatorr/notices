const jwt = require("jsonwebtoken");

const loginMiddleware = (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) throw Error("unauthorised");
    const user = jwt.verify(token, process.env.SECRET);
    if (!user) throw Error("unauthorised");
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { loginMiddleware };
