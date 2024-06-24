const introductionArticlesRouter = require("express").Router();
const { Article, Introduction } = require("../models/introduction");
const { extractFolderName } = require("../utils/helper_function");

introductionArticlesRouter.get(
  "/:introductionId/articles",
  async (req, res) => {
    const articles = await Article.find({});

    res.status(200).json(articles);
  }
);

introductionArticlesRouter.get(
  "/:introductionId/articles/:articleId",
  async (req, res) => {
    const article = await Article.findById(req.params.articleId);
    article.status(200).json(res);
  }
);

introductionArticlesRouter.post(
  "/:introductionId/articles",
  async (req, res) => {
    const imageUrl = req.cloudImageUrl;

    const newArticle = new Article({ ...req.body, imageUrl });
    const createdArticle = await newArticle.save();

    res.status(201).json(createdArticle);
  }
);

module.exports = introductionArticlesRouter;
