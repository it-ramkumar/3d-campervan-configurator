const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// ✅ Configure AWS SDK v2
AWS.config.update({
  accessKeyId: process.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VITE_REACT_APP_AWS_REGION,
});

// ✅ Create S3 instance
const s3 = new AWS.S3();

// 📁 For Vans
const vans = multerS3({
  s3,
  bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `vans/${Date.now()}_${file.originalname}`);
  },
});

// 📁 For Portfolios
const portfolios = multerS3({
  s3,
  bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `portfolios/${Date.now()}_${file.originalname}`);
  },
});

// 📁 For Blogs
const blogs = multerS3({
  s3,
  bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `blogs/${Date.now()}_${file.originalname}`);
  },
});

module.exports = { vans, portfolios, blogs };
