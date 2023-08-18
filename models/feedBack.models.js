const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedBackSchema = new Schema(
    {
        userId: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            trim: true,
        },

    },
    { timestamps: true }
);

const feedBack = mongoose.model("feedBack", feedBackSchema);

module.exports = feedBack;
