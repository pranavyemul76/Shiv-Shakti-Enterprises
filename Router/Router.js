const express = require("express");
const routes = express.Router();
const controller = require("../Controllers/images");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
// upload file
routes.post(
  "/api/uploadFile",
  upload.single("products"),
  controller.uploadfile
);
routes.get("/getimages", controller.getImages);
routes.delete("/deleteimage", controller.deleteimage);
module.exports = routes;
