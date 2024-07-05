const servicesRouter = require("express").Router();
const { Service, ServicePage } = require("../models/servicePage");

servicesRouter.get("/:pageId/services", async (req, res) => {
  const services = await Service.find({});

  res.status(201).json(services);
});

servicesRouter.get("/:pageId/services/:serviceId", async (req, res) => {
  const service = await Service.findById(req.params.serviceId);

  res.status(201).json(service);
});

servicesRouter.get("/:pageId/services/:serviceId", async (req, res) => {
  const services = await Service.find({});

  res.status(201).json(services);
});

servicesRouter.post("/:pageId/services", async (req, res) => {
  const imageUrl = req.cloudImageUrl;
  const newService = new Service({ ...req.body[0], imageUrl });
  const savedService = await newService.save();

  const pageToUpdate = await ServicePage.findById(req.params.pageId);
  pageToUpdate.services = pageToUpdate.services.concat(savedService._id);
  await pageToUpdate.save();

  res.status(201).json(savedService);
});

module.exports = servicesRouter;
