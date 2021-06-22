require("dotenv").config();
const AWS = require("aws-sdk");
const express = require("express");
const app = express();
const multer = require("multer");
const multerS3 = require("multer-s3");

app.use(express.json());

const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, req.params.name + "-" + Date.now().toString());
    },
  }),
});

app.post("/upload/:name", upload.single("file"), (req, res) => {
  res.send(req.file.key);
});

app.get("/image/:imageId", (req, res) => {
  const params = { Bucket: process.env.BUCKET_NAME, Key: req.params.imageId };
  res.send(s3.getSignedUrl("getObject", params));
});

app.listen(3001, () => {
  console.log("listening to port 3001");
});

// module.exports = { uploadFile };
