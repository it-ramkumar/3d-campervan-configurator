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
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000","https://3d-campervan-configurator.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

module.exports = cors(corsOptions);
