const cors = require('cors');
const corsOptions = {
  origin: [
    "https://zain.d2qr91yoy4oomc.amplifyapp.com",
    "http://localhost:5173",
    "http://localhost:3000",
    "https://big-bear-vans.vercel.app/",
    "https://big-bear-vans.vercel.app",
    "big-bear-vans.vercel.app",
    "https://new.bigbearvans.com",
    "https://bigbearvans.com",
    "https://www.bigbearvans.com",

  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = cors(corsOptions);
