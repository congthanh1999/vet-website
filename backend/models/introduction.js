const mongoose = require("mongoose");
const Image = require("./image");

const headerSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: Image.schema,
  },
});

headerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: Image.schema,
  },
  content: {
    type: String,
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
  image: {
    type: Image.schema,
  },
  issueYear: {
    type: Date,
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
  image: {
    type: Image.schema,
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
  header: headerSchema,
  certificates: [certificateSchema],
  managers: [personSchema],
  articles: [articleSchema],
});

introductionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Introduction", introductionSchema);
