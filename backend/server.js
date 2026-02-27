require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const helmetMiddleware = require("./middleware/helmetMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");
// const { globalLimiter } = require("./middleware/rateLimiting");
const { morganMiddleware, logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const quoteRoutes = require("./routes/qouteRoute");
const modelsRoute = require("./routes/modelsRoute");
const van = require('./routes/van')
const portfolio = require('./routes/portfolio')
const contactUs = require('./routes/contactUs')
const inquery = require("./routes/inquery")
// const Export = require("./routes/exportModel");
const userRoute = require("./routes/authRoute");
const TestBlog = require("./routes/testBlog")
const DelelteImageFromS3 = require("./routes/deleteImageFroms3");
const ZohoToken = require("./routes/googleCalender")
const InteriorCategory = require("./routes/interiorCategory")
const InteriorChoices = require("./routes/interiorRoute")
const InteriorSubCategory = require("./routes/interiorSubCategory")
const ExteriorCategory = require("./routes/exteriorCat");
const ExteriorSubCategory = require("./routes/exteriorSubCat")
const ExteriorRoute = require("./routes/exteriorR")
const LeadEmailsRoute = require("./routes/leadsEmail");
const Job = require("./routes/job");
const Application = require("./routes/application");
const QuickLinks = require("./routes/quickLinks")
const Sitemap = require("./routes/siteMap");
const SystemRoute = require("./routes/systemR");
const SystemCategory =require("./routes/systemCat");
const SystemSubCategory = require("./routes/systemSubCat")
const BaseVanRoute = require("./routes/baseVan");


const app = express();
const PORT = process.env.PORT || 5000;




connectDB()
  .then(() => logger.info(" Connected to MongoDB"))
  .catch((err) => logger.error(` MongoDB connection error: ${err.message}`));


app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(morganMiddleware);
// Ye lines routes define karne se PEHLE honi chahiye
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);
// app.use(globalLimiter);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", DelelteImageFromS3);
app.use("/api/test-blog", TestBlog)
app.use("/api/portfolio", portfolio)
// app.use("/api", Export)
app.use("/api/van", van)
app.use("/api", userRoute);
app.use("/api/inquery", inquery)
app.use("/api/contact", contactUs);
app.use("/api/quote", quoteRoutes);
app.use("/api/models", modelsRoute);
app.use("/api/calendar", ZohoToken)
app.use("/api", InteriorCategory)
app.use("/api", InteriorChoices)
app.use("/api", InteriorSubCategory)
app.use("/api", ExteriorCategory)
app.use("/api", ExteriorRoute)
app.use("/api", ExteriorSubCategory)
app.use("/api", SystemCategory)
app.use("/api", SystemRoute)
app.use("/api", SystemSubCategory)
app.use("/api", LeadEmailsRoute)
app.use("/api/jobs", Job);
app.use("/api/applications", Application);
app.use("/api/quick-links", QuickLinks);
app.use("/sitemap.xml", Sitemap);
app.use("/api", BaseVanRoute);





app.get("/auto", (req, res) => {
  res.send("auto deployment is working...remove limit ");
});
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Backend is working auto deployemnet. ");
});
// 10 Start the Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
