require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const axios = require('axios')

const helmetMiddleware = require("./middleware/helmetMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");
const { globalLimiter } = require("./middleware/rateLimiting");
const { morganMiddleware, logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const quoteRoutes = require("./routes/qouteRoute");
const postModelDataRoute = require("./routes/postModelDataRoute");
const insertManyDataRoute = require("./routes/insertManyData");
const modelsRoute = require("./routes/modelsRoute");
const van = require('./routes/van')
const portfolio = require('./routes/portfolio')
const Changed = require('./routes/changes')
const contactUs = require('./routes/contactUs')
const inquery = require("./routes/inquery")

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.YOUTUBE_API_KEY;
// console.log(API_KEY,"key")
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

app.set("trust proxy", 1);
// 5️ Enable CORS
app.use(corsMiddleware);

// 6️ Rate Limiting
app.use(globalLimiter);
app.use("/", Changed)
app.use("/api/portfolio", portfolio)

app.use("/api/van", van)
app.use("/api/inquery", inquery)
app.use("/api/contact", contactUs);
app.use("/api/quote", quoteRoutes);
app.use("/api/modelsData", postModelDataRoute);
app.use("/api/insertManyData", insertManyDataRoute);
app.use("/api/models", modelsRoute);
app.use("/api", postModelDataRoute);

// -----------------------------------------------

function extractChannelId(url) {
  const matchId = url.match(/channel\/([a-zA-Z0-9_-]+)/);
  if (matchId) return matchId[1];

  const matchHandle = url.match(/youtube\.com\/@([a-zA-Z0-9._-]+)/);
  if (matchHandle) return matchHandle[1];

  return null;
}

function extractChannelId(url) {
  const matchId = url.match(/channel\/([a-zA-Z0-9_-]+)/);
  if (matchId) return matchId[1];

  const matchHandle = url.match(/youtube\.com\/@([a-zA-Z0-9._-]+)/);
  if (matchHandle) return matchHandle[1];

  return null;
}

app.post("/api/channel-estimate", async (req, res) => {
  try {
    const { channelUrl } = req.body;
    const channelIdentifier = extractChannelId(channelUrl);

    if (!channelIdentifier) {
      return res.status(400).json({ error: "Invalid channel URL" });
    }

    let channelId = null;

    // Agar handle mila to resolve karo
    if (channelUrl.includes("@")) {
      const handleRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${channelIdentifier}&key=${API_KEY}`
      );
      if (handleRes.data.items.length > 0) {
        channelId = handleRes.data.items[0].id;
      }
    } else {
      channelId = channelIdentifier;
    }

    if (!channelId) {
      return res.status(404).json({ error: "Channel not found" });
    }

    // Channel details fetch
    const ytRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`
    );

    const channel = ytRes.data.items[0];
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const totalViews = parseInt(channel.statistics.viewCount || 0);
    const subscribers = parseInt(channel.statistics.subscriberCount || 0);
    const videoCount = parseInt(channel.statistics.videoCount || 0);
    const creationDate = channel.snippet.publishedAt;
    const country = channel.brandingSettings?.channel?.country || "N/A";
    const categoryId = channel.snippet.categoryId || null;
    const channelImage = channel.snippet.thumbnails?.high?.url || null;
const bannerImage =
  channel.brandingSettings?.image?.bannerExternalUrl || null;


    // ----- LEGACY simple lifetime estimate -----
    const legacyEstimatedRevenue = ((totalViews / 1000) * 1.5).toFixed(2);

    // --- Country multipliers ---
    const countryRPM = {
      US: 4.0,
      GB: 3.5,
      UK: 3.5,
      CA: 3.0,
      IN: 0.5,
      PK: 0.3,
      default: 0.8,
    };
    const countryFactor = (country && countryRPM[country]) ? countryRPM[country] : countryRPM.default;

    // --- Category multipliers ---
    const categoryFactors = {
      1: 1.0, // Film & Animation
      2: 0.7, // Autos & Vehicles
      10: 0.8, // Music
      20: 1.0, // Gaming
      22: 1.2, // People & Blogs
      24: 1.5, // Entertainment
      26: 2.0, // Howto & Style
      27: 2.5, // Education
      28: 3.0, // Science & Technology
    };
    const catNum = categoryId ? Number(categoryId) : null;
    const categoryFactor = catNum ? (categoryFactors[catNum] || 1.0) : 1.0;

    // --- RPM brackets (per 1000 views, USD) ---
     const rpmBrackets = {
      "$0.01 (low short RPM)": 0.01,
      "$0.05 (typical short RPM)": 0.05,
      "$0.08 (high short RPM)": 0.08,
      "$0.10 (very low)": 0.10,
      "$0.75 (music)": 0.75,
      "$1.00 (entertainment/pets)": 1.00,
      "$2.50 (gaming)": 2.50,
      "$3.50 (blogs/how-to)": 3.50,
      "$5.00 (education)": 5.00,
      "$8.00 (finance lower)": 8.00,
      "$20.00 (finance upper)": 20.00,
    };

    // --- Revenue breakdown (adjusted by country & category) ---
    const revenueEstimates = {};
    for (const [label, rpm] of Object.entries(rpmBrackets)) {
      const adjustedRpm = rpm * countryFactor * categoryFactor;
      const revenue = ((totalViews / 1000) * adjustedRpm).toFixed(2);
      revenueEstimates[label] = `$${revenue}`;
    }

    // --- Approx Monthly Revenue ---
    const monthsSinceCreation =
      (new Date() - new Date(creationDate)) / (1000 * 60 * 60 * 24 * 30);
    const avgMonthlyViews = monthsSinceCreation > 0 ? (totalViews / monthsSinceCreation) : 0;

    const avgMonthlyRevenue = ((avgMonthlyViews / 1000) * 2 * countryFactor * categoryFactor).toFixed(2);

    // --- Shorts vs Long calculation (last 50 videos) ---
    const searchRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=id&maxResults=50&order=date&type=video`
    );

    const videoIds = searchRes.data.items.map(v => v.id.videoId).join(",");
    let shortsRatio = null;

    if (videoIds.length > 0) {
      const videosRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails`
      );

      let shortsCount = 0;
      let longCount = 0;

      videosRes.data.items.forEach(v => {
        const duration = v.contentDetails.duration; // e.g. PT15S, PT5M30S
        const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);

        let seconds = 0;
        if (match) {
          const minutes = parseInt(match[1] || 0);
          const secs = parseInt(match[2] || 0);
          seconds = minutes * 60 + secs;
        }

        if (seconds > 0 && seconds < 60) {
          shortsCount++;
        } else {
          longCount++;
        }
      });

      const totalChecked = shortsCount + longCount;
      if (totalChecked > 0) {
        shortsRatio = {
          shortsCount,
          longCount,
          shortsPercent: ((shortsCount / totalChecked) * 100).toFixed(1) + "%",
          longsPercent: ((longCount / totalChecked) * 100).toFixed(1) + "%"
        };
      }
    }

    res.json({
      channelName: channel.snippet.title,
      channelId,
      subscribers,
      totalViews,
      views: totalViews,
      videoCount,
      country,
      channelImage,  // added
  bannerImage,   // added

      creationDate,

      estimatedRevenue: `$${legacyEstimatedRevenue} (lifetime approx)`,

      revenueEstimates,
      avgMonthlyViews: Math.round(avgMonthlyViews),
      avgMonthlyRevenue: `$${avgMonthlyRevenue} (approx)`,

      shortsRatio, // NEW field

      notes: [
        "estimatedRevenue is a simple legacy lifetime estimate (fixed RPM = $1.5).",
        "revenueEstimates show different RPM brackets adjusted by country & category.",
        "Monthly revenue uses average monthly views (all numbers approximate).",
        "shortsRatio is based on last 50 videos (duration <60s = short)."
      ]
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});





// 9️ Global Error Handler (catches any thrown errors)
app.use(errorHandler);

// 10 Start the Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});