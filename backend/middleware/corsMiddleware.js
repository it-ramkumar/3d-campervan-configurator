const cors = require('cors');
const corsOptions = {
  origin: [
    "https://zain.d2qr91yoy4oomc.amplifyapp.com",
    "http://localhost:3000",
    "https://www.bigbearvans.com",
    "https://bigbearvans.com",

  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = cors(corsOptions);
