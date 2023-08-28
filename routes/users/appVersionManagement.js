const express = require("express");
const router = express.Router();

router.get("/latestReleasedVersion", (req, res) => { //only for razorpay
    res.status(200).json({ lastReleasedVersion: 1 });
});

module.exports = router;