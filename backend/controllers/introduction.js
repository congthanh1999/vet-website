const introductionRouter = require("express").Router();
const Introduction = require("../models/introduction");
const multer = require("multer");
const _ = require("lodash");
const upload = multer();

introductionRouter.get("/", async (req, res) => {
  const introduction = await Introduction.find({});

  res.status(200).json(introduction);
});

introductionRouter.get("/:id", async (req, res) => {
  const introduction = await Introduction.findById(req.params.id);
  const img = Buffer.from(introduction.header.image.data, "base64");

  res.send(`
  <html>
    <body>
      <img src="data:image/jpeg;base64,${img.toString("base64")}" />
    </body>
  </html>
`);
});

introductionRouter.post("/", upload.any(), async (req, res) => {
  const newIntroductionData = req.body;

  if (req.files) {
    req.files.forEach((file) => {
      newIntroductionData[`${file.fieldname}`] = {
        data: file.buffer,
        contentType: "image/png",
      };
    });
  }

  const result = {};
  for (let key in newIntroductionData) {
    _.set(result, key, newIntroductionData[key]);
  }

  const newIntroduction = new Introduction(result);

  const createdIntroduction = await newIntroduction.save();

  res.status(201).json(createdIntroduction);
});

// introductionRouter.patch("/:id", upload.any(), async (req, res) => {
//   const updateContent = req.body;

//   if (req.files) {
//     req.files.forEach((file) => {
//       updateContent[`${file.fieldname}`] = {
//         data: file.buffer,
//         contentType: "image/png",
//       };
//     });
//   }

//   const result = {};
//   for (let key in updateContent) {
//     _.set(result, key, updateContent[key]);
//   }

//   const introduction = await Introduction.findById(req.params.id);

//   for (let i = 0; i < result.certificates.length; i++) {
//     if (result.certificates[i]) {
//       introduction.certificates
//         .id(introduction.certificates[i].id)
//         .set(result.certificates[i]);
//     }
//   }

//   const updatedIntroduction = await Introduction.findByIdAndUpdate(
//     req.params.id,
//     introduction,
//     {
//       new: true,
//       runValidators: true,
//       context: "query",
//     }
//   ).lean();

//   res.status(201).json(updatedIntroduction);
// });

introductionRouter.patch("/:id", async (req, res) => {
  const { certificates, ...restUpdate } = req.body;

  
});

introductionRouter.delete("/:id", async (req, res) => {
  const deletedIntroduction = await Introduction.findByIdAndDelete(
    req.params.id
  );
  res.status(204).json(deletedIntroduction);
});

module.exports = introductionRouter;
