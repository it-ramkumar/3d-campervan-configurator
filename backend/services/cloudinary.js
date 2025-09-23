const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 📌 Profile images storage
const vans = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vans',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});

// 📌 Profile images storage
const portfolios = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolios',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});


// ✅ Export both
module.exports = {
vans,
portfolios
};
