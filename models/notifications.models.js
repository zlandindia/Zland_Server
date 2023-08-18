const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expoToken = new Schema({
    token: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    }
})

const ExpoToken = mongoose.model("ExpoToken", expoToken);

module.exports = ExpoToken;