const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  content: {
    type: String,
  },
  introduction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Introduction",
  },
});

articleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  issueYear: {
    type: Date,
    validatate: {
      validator: (v) => {
        return /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
      },
    },
  },
  introduction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Introduction",
  },
});

certificateSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  position: {
    type: String,
  },
  scholar: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  introduction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Introduction",
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const introductionSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  imageUrl: {
    type: String,
    // required: true,
  },
  certificates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate",
    },
  ],
  managers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

introductionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = {
  Introduction: mongoose.model("Introduction", introductionSchema),
  Certificate: mongoose.model("Certificate", certificateSchema),
  Person: mongoose.model("Person", personSchema),
  Article: mongoose.model("Article", articleSchema),
};
