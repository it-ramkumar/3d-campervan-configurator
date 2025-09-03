require('dotenv').config();

const environment = {
  MONGODB_URI:'mongodb+srv://bigbearvan4:<db_password>@cluster0.us0whl2.mongodb.net/',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

module.exports = environment;