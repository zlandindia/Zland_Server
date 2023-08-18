const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const landSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    street: {
      type: String,
      require: true,
      trim: true,
    },
    country: {
      type: String,
      require: true,
      trim: true,
    },
    state: {
      type: String,
      require: true,
      trim: true,
    },
    city: {
      type: String,
      require: true,
      trim: true,
    },
    totalsqfeet: {
      type: Number,
      require: true,
      trim: true,
    },
    lengthinft: {
      type: Number,
      require: true,
      trim: true,
    },
    widthinft: {
      type: Number,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    userId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Land = mongoose.model("Land", landSchema);

module.exports = Land;
