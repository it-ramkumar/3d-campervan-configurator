const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://bigbearvan4:bigbearvan4@cluster0.us0whl2.mongodb.net/Product_Content?retryWrites=true&w=majority', );
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;