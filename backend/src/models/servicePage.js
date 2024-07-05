const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  summary: {
    type: String,
  },
  details: {
    type: String,
  },
});

const servicePageSchema = new mongoose.Schema({
  header: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

module.exports = {
  Service: mongoose.model("Service", serviceSchema),
  ServicePage: mongoose.model("ServicePage", servicePageSchema),
};
