require('dotenv').config();
const AWS = require('aws-sdk');
const express = require('express');
const picture = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const { validateToken } = require('../utils');

picture.use(express.json());

//Connect to aws user
const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
});

//Middleware that upload file to s3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, uuidv4());
    },
  }),
});

//post request to upload file
picture.post('/upload', upload.single('file'), (req, res) => {
  res.send(req.file.key);
});

//get request for url signed
picture.get('/image/:imageId', (req, res) => {
  const params = { Bucket: process.env.BUCKET_NAME, Key: req.params.imageId };
  res.send(s3.getSignedUrl('getObject', params));
});

picture.delete('/image/:userId/:imageId', validateToken, (req, res) => {
  const { userId } = reg.params;
  if (userId !== req.data.id)
    return res.status(403).send('only the owner can update image');
  const params = { Bucket: process.env.BUCKET_NAME, Key: req.params.imageId };
  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // error
    else res.send('image deleted');
  });
});

module.exports = picture;
