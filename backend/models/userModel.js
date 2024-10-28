const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: String, 
  otpExpires: Date,
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

module.exports = mongoose.model("User", userSchema);
