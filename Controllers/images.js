const Products = require("../Modules/Products");
exports.uploadfile = (req, res) => {
  const fs = require("fs");
  if (req.file) {
    // checking  request file undefinde or not
    if (req.file.mimetype == "image/jpeg" || req.file.mimetype == "video/mp4") {
      // checking file extention
      fs.createReadStream(req.file.path).on("end", () => {
        const imagedetail = new Products({
          filename: req.file.filename,
          contentType: req.file.mimetype,
          path: req.file.path,
        });
        //save in mongodb database
        imagedetail
          .save()
          .then((response) => {
            res.json({ messeage: "image upload successfully" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      //  file extenstion error response
      res.json({
        messeage: `${req.file.mimetype}  file extenstion not allowed `,
      });
    }
  } else {
    // error if file is empty response
    res.json({ messeage: "please upload file" });
  }
};
exports.getImages = (req, res) => {
  Products.find().then((response) => {
    // get All videos and images
    const videos = response.filter(({ contentType }) => {
      // get all videos
      return contentType == "video/mp4";
    });
    const images = response.filter(({ contentType }) => {
      // get all imgaes
      return contentType == "image/jpeg";
    });
    res.json({ videos: videos, images: images });
  });
};
exports.deleteimage = (req, res) => {
  // deleting images by filename
  Products.deleteOne({ filename: req.body.filename }).then((response) => {
    res.json({ messeage: response });
  });
};
