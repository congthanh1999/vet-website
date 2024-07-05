const extractFolderName = (method, url) => {
  const tokens = url.split("/");
  console.log(tokens);
  const tokensLength = tokens.length;
  let fileObject = {
    baseFolderName: tokens[2],
    folderName: null,
    fileName: null,
  };

  switch (true) {
    case ["POST"].includes(method):
      fileObject = {
        ...fileObject,
        folderName: tokens[tokensLength - 1],
      };
      break;
    case ["PUT", "PATCH", "DELETE"].includes(method):
      fileObject = {
        ...fileObject,
        folderName: tokens[tokensLength - 2],
        fileName: tokens[tokensLength - 1],
      };
      break;
    default:
      break;
  }

  return fileObject;
};

module.exports = { extractFolderName };
