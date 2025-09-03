// const express = require("express");
// const router = express.Router();
// const Link = require("../models/link");
// const auth = require("../middleware/authMiddleware");
// const shortid = require("shortid"); // Install with: npm install shortid
// const AWS = require("aws-sdk");



// // POST /api/links/guest - allow guest users to store link
// router.post("/guest", async (req, res) => {
//   const { name, url } = req.body;

//   if (!url) {
//     return res.status(400).json({ message: "URL is required" });
//   }

//   try {
//     const code = name || shortid.generate();

//     // Store without any user ID
//     const link = new Link({ name: code, url }); // no `user` field
//     await link.save();

//     res.status(201).json({ code });
//   } catch (err) {
//     console.error("POST /api/links/guest error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // POST /api/links/secure - Create a secure short share code
// router.post("/secure", auth, async (req, res) => {
//   const { s3Url } = req.body;
//   if (!s3Url) return res.status(400).json({ message: "s3Url is required" });

//   try {
//     const code = req.body.name || shortid.generate();
//     const link = new Link({ user: req.userId, name: code, url: s3Url });
//     await link.save();
//     res.status(201).json({ code });
//   } catch (err) {
//     console.error("POST /api/links/secure error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET /api/links/code/:code - Resolve short code to actual S3 URL
// router.get("/code/:code", async (req, res) => {
//   try {
//     const link = await Link.findOne({ name: req.params.code });
//     if (!link) return res.status(404).json({ message: "Invalid code" });
//     res.json({ url: link.url });
//   } catch (err) {
//     console.error("GET /api/links/code/:code error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET /api/links - list current user's links
// router.get("/", auth, async (req, res) => {
//   try {
//     const links = await Link.find({ user: req.userId });
//     res.json({ links });
//   } catch (err) {
//     console.error("GET /api/links error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // POST /api/links - create a new link
// router.post("/", auth, async (req, res) => {
//   const { name, url } = req.body;
//   if (!name || !url)
//     return res.status(400).json({ message: "Name and URL are required" });

//   try {
//     const link = new Link({ user: req.userId, name, url });
//     await link.save();
//     res.status(201).json({ link });
//   } catch (err) {
//     console.error("POST /api/links error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // PUT /api/links/:id - update link name
// router.put("/:id", auth, async (req, res) => {
//   const { name } = req.body;

//   try {
//     const link = await Link.findById(req.params.id);
//     if (!link) return res.status(404).json({ message: "Link not found" });
//     if (link.user.toString() !== req.userId) {
//       return res.status(403).json({ message: "Not authorized" });
//     }
//     link.name = name || link.name;
//     await link.save();
//     res.json({ link });
//   } catch (err) {
//     console.error("PUT /api/links/:id error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const link = await Link.findById(req.params.id);
//     if (!link) return res.status(404).json({ message: "Link not found" });
//     if (link.user.toString() !== req.userId) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     // Extract the S3 key from the URL
//     const s3Url = new URL(link.url);
//     const Key = decodeURIComponent(s3Url.pathname).substring(1);

//     // Configure AWS
//     AWS.config.update({
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       region: process.env.AWS_REGION,
//     });

//     const s3 = new AWS.S3();
//     await s3.deleteObject({
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key,
//     }).promise();

//     // Delete the link from MongoDB
//     await link.deleteOne();

//     res.json({ message: "Link and model deleted successfully" });
//   } catch (err) {
//     console.error("DELETE /api/links/:id error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
