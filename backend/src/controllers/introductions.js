const introductionRouter = require("express").Router();
const { Introduction } = require("../models/introduction");

introductionRouter.get("/", async (req, res) => {
  const introduction = await Introduction.find({});

  res.status(200).json(introduction);
});

introductionRouter.get("/:id", async (req, res) => {
  const introduction = await Introduction.findById(req.params.id);

  res.status(200).json(introduction);
});

introductionRouter.post("/", async (req, res) => {
  const imageUrl = req.cloudImageUrl;
  const newIntroduction = new Introduction({
    ...req.body,
    imageUrl,
  });

  const createdIntroduction = await newIntroduction.save();

  res.status(201).json(createdIntroduction);
});

introductionRouter.patch("/:id", async (req, res) => {
  const imageUrl = req.cloudImageUrl;
  const newIntroduction = { ...req.body, imageUrl };

  const updatedIntroduciton = await Introduction.findByIdAndUpdate(
    req.params.id,
    newIntroduction,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  res.status(200).json(updatedIntroduciton);
});

introductionRouter.delete("/:id", async (req, res) => {
  const deletedIntroduction = await Introduction.findByIdAndDelete(
    req.params.id
  );
  res.status(204).json(deletedIntroduction);
});

module.exports = introductionRouter;
