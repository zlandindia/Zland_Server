const express = require("express");
const router = express.Router();

router.get("/paymentDetails", (req, res) => {
    // res.send({ OTP: "909547", Test: mobileNumber });
    res.status(200).json({ ID: "rzp_test_kM6TGFic2ENg3f", "SECRET": "DqzrRqBYxu2b3KW7UMGRTnmL", "AMOUNT": 200 });
});

module.exports = router;
