const News = require("../models/news");
const newsRouter = require("express").Router();

newsRouter.get("/", async (req, res) => {
  const news = await News.find({});

  res.status(201).json(news);
});

newsRouter.post("/", async (req, res) => {
  const news = new News(req.body);
  const savedNews = await news.save();

  res.status(201).json(savedNews);
});

module.exports = newsRouter;
