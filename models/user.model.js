const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlenght: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlenght: 255,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports.User = mongoose.model("Agent", userSchema);
