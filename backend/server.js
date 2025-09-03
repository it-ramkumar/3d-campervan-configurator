require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

const helmetMiddleware = require("./middleware/helmetMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");
const { globalLimiter } = require("./middleware/rateLimiting");
const { morganMiddleware, logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const quoteRoutes = require("./routes/qouteRoute");
const postModelDataRoute = require("./routes/postModelDataRoute");
const insertManyDataRoute = require("./routes/insertManyData");
const modelsRoute = require("./routes/modelsRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// 1️ Connect to MongoDB
connectDB()
  .then(() => logger.info(" Connected to MongoDB"))
  .catch((err) => logger.error(` MongoDB connection error: ${err.message}`));

// 2️ Security Middleware
app.use(helmetMiddleware);

// 3️ HTTP Request Logging (Morgan + Winston)
app.use(morganMiddleware);

// 4️ Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 5️ Enable CORS
app.use(corsMiddleware);

// 6️ Rate Limiting
app.use(globalLimiter);

// 7️ Routes
app.use("/api", authRoutes);
app.use("/api/quote", quoteRoutes);
app.use("/api/modelsData", postModelDataRoute);
app.use("/api/insertManyData", insertManyDataRoute);
app.use("/api/models", modelsRoute);
app.use("/api", postModelDataRoute);

//authMiddleware for protected routes
app.get("/api/protected", authMiddleware, (req, res) => {
  console.log("Decoded user:", req.user); // 👀 See what comes from JWT
  res.json({
    success: true,
    message: `Protected route accessed!`,
    user: req.user
  });
});

// 9️ Global Error Handler (catches any thrown errors)
app.use(errorHandler);

// 10 Start the Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
