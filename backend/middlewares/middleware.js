const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "JsonWebTokenError") {
    return res.status(404).json({ error: `unauthorized token` });
  }

  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }

  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    req.user = null;
  } else {
    const decodedToken = jwt.verify(req.token, config.SECRET);

    req.user = await User.findById(decodedToken.id);
  }

  next();
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
