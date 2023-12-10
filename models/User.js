const mongoose = require("mongoose");

// define User model schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 255,
      trim: true,
    },
    email: {
      //type: mongoose.SchemaTypes.Email,
      type: String,
      required: true,
      max: 255,
      trim: true,
      unique: true,
      lowercase: true,
    },
    birth_date: {
      required: true,
      type: Date,
    },
    password: {
      type: String,
      max: 1024,
      min: 8,
      required: true,
    },
    email_verified_at: {
      required: false,
      type: Date,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
