// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   googleId: String,
//   name: String,
//   email: String,
//   orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String }, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // now password is optional if registered via Google
  
},
 { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
