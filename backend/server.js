require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const axios = require('axios')
const cookieParser = require("cookie-parser");


const helmetMiddleware = require("./middleware/helmetMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");
const { globalLimiter } = require("./middleware/rateLimiting");
const { morganMiddleware, logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const quoteRoutes = require("./routes/qouteRoute");
const modelsRoute = require("./routes/modelsRoute");
const van = require('./routes/van')
const portfolio = require('./routes/portfolio')
const contactUs = require('./routes/contactUs')
const inquery = require("./routes/inquery")
const Export = require("./routes/exportModel");
const blogs = require("./routes/blog");
const userRoute = require("./routes/authRoute");

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
app.use(cookieParser());
app.set("trust proxy", 1);
// 5️ Enable CORS
app.use(corsMiddleware);
app.use(globalLimiter);


app.use("/api/portfolio", portfolio)
app.use("/api", Export)
app.use("/api/blog", blogs)
app.use("/api/van", van)
app.use("/api", userRoute);
app.use("/api/inquery", inquery)
app.use("/api/contact", contactUs);
app.use("/api/quote", quoteRoutes);
app.use("/api/models", modelsRoute);

app.get("/auto", (req, res) => {
  res.send("auto deployment is working  now✅");
});
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});
// 10 Start the Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
