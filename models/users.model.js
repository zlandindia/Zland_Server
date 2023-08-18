const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    mobilenumber: {
      type: Number,
      require: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    city: {
      type: String,
      require: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      require: true,
      trim: true,
    },
    userType: {
      type: String,
      default: 'unknown',
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
