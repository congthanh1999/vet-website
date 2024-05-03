const mongoose = require("mongoose");
const CertificateSchema = require("./certificate").schema;
const PersonSchema = require("./person").schema;
const ArticleSchema = require("./article").schema;

const introductionSchema = new mongoose.Schema({
  header: {
    type: String,
  },
  headerImage: {
    type: String,
  },
  certificates: [CertificateSchema],
  managers: [PersonSchema],
  articles: [ArticleSchema],
});

introductionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Introduction", introductionSchema);
