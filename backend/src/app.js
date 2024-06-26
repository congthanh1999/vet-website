const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const postsRouter = require("./controllers/posts");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const introductionRouter = require("./controllers/introduction");
const middleware = require("./middlewares/middleware");
const path = require("path");

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(middleware.tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", middleware.userExtractor, postsRouter);
app.use("/api/introduction", introductionRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
