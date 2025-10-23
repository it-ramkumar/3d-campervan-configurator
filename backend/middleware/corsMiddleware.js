// const cors = require('cors');

// // const allowedOrigins = [
// //   process.env.CLIENT_URL || 'http://localhost:3000',
// //   'https://bigbearvans.d3pbrrligotzvl.amplifyapp.com',
// // ];

// // const corsOptions = {
// //   origin: (origin, callback) => {
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   },
// //   credentials: true,
// // };

// //for testing i have allow all links here
// const corsOptions = {
//   origin: ["http://localhost:5173","localhost:5173", "https://new.bigbearvans.com","https://zain.d2qr91yoy4oomc.amplifyapp.com","https://bigbearvans.com"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// };

// module.exports = cors(corsOptions);
const cors = require('cors');
require("dotenv").config();
const allowedOrigins = [
  process.env.CLIENT_URL || "https://bbv.d3pbrrligotzvl.amplifyapp.com",
  "https://bbvs.d3pbrrligotzvl.amplifyapp.com",
  "https://bigbearvans.d3pbrligotzvl.amplifyapp.com",
  "https://www.vanbuild3d.com",
  "https://vanbuild3d.com",
  "https://campervanprice.com",
  "https://main.d2dg0b7tldltwm.amplifyapp.com",
  "http://localhost:5173", "localhost:5173", "https://new.bigbearvans.com", "https://zain.d2qr91yoy4oomc.amplifyapp.com", "https://bigbearvans.com"
];

// Add localhost automatically in development
if (process.env.NODE_ENV === "development") {
  allowedOrigins.push("http://localhost:5173");
  allowedOrigins.push("http://127.0.0.1:3000");
}

const corsOptions = {
  origin: (origin, callback) => {
    console.log("CORS check =>", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};



module.exports = cors(corsOptions);
