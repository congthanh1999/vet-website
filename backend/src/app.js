const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const cors = require("cors");

const postsRouter = require("./controllers/posts");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const introductionsRouter = require("./controllers/introductions");
const introductionArticlesRouter = require("././controllers/introductionArticles");
const servicePageRouter = require("./controllers/servicePage");
const newsRouter = require("./controllers/news");
const servicesRouter = require("./controllers/services");

const middleware = require("./middlewares/middleware");
const { getUrl, getUrls } = require("./middlewares/cloudinary");

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
app.use(
  "/api/introductions",
  getUrl,
  introductionsRouter,
  introductionArticlesRouter
);
app.use(
  "/api/service-page",
  getUrl,
  getUrls,
  servicePageRouter,
  servicesRouter
);
app.use("/api/news", newsRouter);

app.use(cors());
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
