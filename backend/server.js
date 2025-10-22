require("dotenv").config();
const fs = require("fs");
const https = require("https");
const http = require("http");
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const axios = require("axios");

// 🛡 Middlewares
const helmetMiddleware = require("./middleware/helmetMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");
const { globalLimiter } = require("./middleware/rateLimiting");
const { morganMiddleware, logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// 🧩 Routes
const quoteRoutes = require("./routes/qouteRoute");
const modelsRoute = require("./routes/modelsRoute");
const van = require("./routes/van");
const portfolio = require("./routes/portfolio");
const contactUs = require("./routes/contactUs");
const inquery = require("./routes/inquery");
const Export = require("./routes/exportModel");
const blogs = require("./routes/blog");
const userRoute = require("./routes/authRoute");

const app = express();
const PORT = process.env.PORT || 5000;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

// 1️⃣ Connect MongoDB
connectDB()
  .then(() => logger.info("✅ Connected to MongoDB"))
  .catch((err) => logger.error(`❌ MongoDB connection error: ${err.message}`));

// 2️⃣ Middleware Setup
app.use(helmetMiddleware);
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(corsMiddleware);
app.use(globalLimiter);

// 3️⃣ Routes
app.use("/api/portfolio", portfolio);
app.use("/api", Export);
app.use("/api/blog", blogs);
app.use("/api/van", van);
app.use("/api", userRoute);
app.use("/api/inquery", inquery);
app.use("/api/contact", contactUs);
app.use("/api/quote", quoteRoutes);
app.use("/api/models", modelsRoute);

// 4️⃣ Test Route
app.get("/auto", (req, res) => {
  res.send("🚀 Auto deployment working... done");
});

app.get("/", (req, res) => {
  res.send("✅ Backend is working with HTTPS support!");
});

app.use(errorHandler);

// 5️⃣ HTTPS Setup (only if certs exist)
const keyPath = "./certs/server.key";
const certPath = "./certs/server.cert";

if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  https.createServer(options, app).listen(HTTPS_PORT, "0.0.0.0", () => {
    console.log(`✅ HTTPS Server running on port ${HTTPS_PORT}`);
  });
} else {
  // Fallback to HTTP if no cert found
  http.createServer(app).listen(PORT, "0.0.0.0", () => {
    console.log(`⚠️ HTTPS certs not found. Running HTTP on port ${PORT}`);
  });
}
