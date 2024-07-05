const servicePageRouter = require("express").Router();
const { ServicePage } = require("../models/servicePage");

servicePageRouter.get("/", async (req, res) => {
  const servicePage = await ServicePage.find({});

  res.status(201).json(servicePage);
});

servicePageRouter.post("/", async (req, res) => {
  const imageUrl = req.cloudImageUrl;
  const newServicePage = new ServicePage({ ...req.body, imageUrl });
  const savedServicePage = await newServicePage.save();

  res.status(201).json(savedServicePage);
});

servicePageRouter.patch("/:id", async (req, res) => {
  const imageUrl = req.cloudImageUrl;
  const newServicePage = { ...req.body, imageUrl };

  const udpatedServicePage = await ServicePage.findByIdAndUpdate(
    req.params.id,
    newServicePage,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  res.status(201).json(udpatedServicePage);
});

module.exports = servicePageRouter;
