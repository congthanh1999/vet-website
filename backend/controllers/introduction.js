const introductionRouter = require("express").Router();
const introduction = require("../models/introduction/introduction");

introductionRouter.get("/", async (req, res) => {
  const introduction = await introduction.find({});

  res.status(200).json(introduction);
});

introductionRouter.get("/:id", async (req, res) => {
  const introduction = await introduction.findById(req.params.id);

  res.status(200).json(introduction);
});

introductionRouter.post("/", async (req, res) => {
  const newintroduction = new introduction(req.body);
  const createdintroduction = await newintroduction.save();

  res.status(201).json(createdintroduction);
});

introductionRouter.put("/:id", async (req, res) => {
  const updatedintroduction = await introduction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  res.status(200).json(updatedintroduction);
});

introductionRouter.delete("/:id", async (req, res) => {
  const deletedPost = await introduction.findByIdAndDelete(req.params.id);
  res.status(204).json(deletedPost);
});

module.exports = introductionRouter;
