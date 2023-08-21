const express = require("express");
const router = express.Router();

router.get("/razorpay", (req, res) => { //only for razorpay
    res.status(200).json({ ID: "rzp_test_kM6TGFic2ENg3f", "SECRET": "DqzrRqBYxu2b3KW7UMGRTnmL", "AMOUNT": 200 });
});

module.exports = router;
