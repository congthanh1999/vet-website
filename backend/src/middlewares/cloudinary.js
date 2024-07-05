const cloudinary = require("cloudinary").v2;
const { extractFolderName } = require("../utils/helper_function");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Return "https" URLs
});

const getUrl = async (req, res, next) => {
  try {
    if (req.body.imageUrl) {
      const imagePath = req.body.imageUrl;

      const fileObject = extractFolderName(req.method, req.originalUrl);

      console.log(req.method, req.originalUrl);
      console.log(fileObject);

      const cloudinaryRes = await cloudinary.uploader.upload(imagePath, {
        folder: `household-service/${fileObject.baseFolderName}${
          fileObject.folderName !== fileObject.baseFolderName
            ? `/${fileObject.folderName}`
            : ""
        }`,
        public_id: fileObject.fileName,
      });

      if (!cloudinaryRes) {
        throw new Error("Upload image fail");
      }

      req.cloudImageUrl = cloudinaryRes.url;
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(404).json({ error: error.message });
  } finally {
    next();
  }
};

const getUrls = async (req, res, next) => {
  try {
    if (req.body.length) {
      const imagePaths = req.body.map((item) => item.imageUrl);

      const fileObject = extractFolderName(req.method, req.originalUrl);

      console.log(req.method, req.originalUrl);
      console.log(fileObject);

      const cloudinaryRes = imagePaths.map((imagePath) => {
        return limit(async () => {
          const result = await cloudinary.uploader.upload(imagePath, {
            folder: `household-service/${fileObject.baseFolderName}${
              fileObject.folderName !== fileObject.baseFolderName
                ? `/${fileObject.folderName}`
                : ""
            }`,
            public_id: fileObject.fileName,
          });
        });
      });

      if (!cloudinaryRes) {
        throw new Error("Upload image fail");
      }

      const imageUrls = await Promise.all(cloudinaryRes);
      req.cloudImageUrls = imageUrls;
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(404).json({ error: error.message });
  } finally {
    next();
  }
};

module.exports = { getUrl, getUrls };
