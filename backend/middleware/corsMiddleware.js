const cors = require('cors');

// const allowedOrigins = [
//   process.env.CLIENT_URL || 'http://localhost:3000',
//   'https://bigbearvans.d3pbrrligotzvl.amplifyapp.com',
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };

//for testing i have allow all links here
const corsOptions = {
  origin: [
    "https://zain.d2qr91yoy4oomc.amplifyapp.com",
    "http://localhost:5173",
    "https://new.bigbearvans.com",
    "https://bigbearvans.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = cors(corsOptions);
