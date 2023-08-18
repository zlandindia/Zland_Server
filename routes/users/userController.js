const express = require("express");
const User = require("../../models/users.model");
const FeedBack = require("../../models/feedBack.models")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mysecretkey";

router.post("/MobileNumber", (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  res.send({ OTP: "909547", Test: mobileNumber });
});

router.post("/UserDetails", async (req, res) => {
  try {
    const { mobilenumber, name, city, password, userType } = req.body;
    newnumber = Number(mobilenumber);

    console.log(userType);

    // user Existence check
    async function userExistence(mobilenumber) {
      const existingUser = await User.findOne({ mobilenumber: mobilenumber });
      if (existingUser === null) {
        return false;
      }
      return true;
    }
    const existingUser = await userExistence(mobilenumber);
    if (existingUser) {
      console.log("user already exist");
      res.status(400).json("user already exist");
    }
    // End Existent Check
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ mobilenumber, name, city, hashedPassword, userType });
      newUser
        .save()
        .then(() => {
          const token = jwt.sign(
            { mobile: newUser.mobilenumber, id: newUser._id },
            SECRET_KEY
          );
          res.status(200).json(token);
          console.log("user created & Token Send");
        })
        .catch((err) => {
          console.log("Error here 2");
          res.status(400).json("Error: " + err);
        });
    }
  } catch {
    console.log("Error Here 1");
    res.status(400).json("Something went wrong");
  }
});

router.post("/login", async (req, res) => {
  const { mobilenumber, password } = req.body;
  console.log(typeof mobilenumber);
  console.log(typeof password);
  // user Existence check
  async function getuser(mobilenumber) {
    const existingUser = await User.findOne({ mobilenumber: mobilenumber });
    console.log(existingUser);
    if (existingUser === null) {
      return false;
    }
    return existingUser;
  }

  const user = await getuser(mobilenumber);

  if (!user) {
    res.status(400).json("Invalid Credentials");
  }

  if (user) {
    const matchPassword = await bcrypt.compare(password, user.hashedPassword);
    if (matchPassword) {
      const token = await jwt.sign(
        { mobile: user.mobilenumber, id: user._id },
        SECRET_KEY
      );
      res.status(200).json(token);
    } else {
      res.status(400).json("Invalid Credentials");
    }
  }
});

// Get user details
// Fetching all my lands
router.post("/sellerDetails", verifyToken, async (req, res) => {
  const { userId } = req.body;
  try {
    await User.find({ _id: userId }).then((error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    });
  } catch (error) {
    res.send("Sorry Something Wrong");
  }
});
// End fetching all my lands
// End get user details

// Feedback message
router.post("/feedBack", verifyToken, async (req, res) => {
  let token = req.headers["authorizatrion"];
  const { message } = req.body;
  const userId = await jwt.decode(token).id;

  try {
    const newFeedBack = new FeedBack({
      userId,
      message,
    });
    console.log("Entered")
    await newFeedBack
      .save()
      .then(() => {
        res.json("Thank you! We will contact you soon");
      })
      .catch((error) => {
        res.status(400).json("error");
      });
  } catch (error) {
    res.send("Sorry Something Wrong");
  }
});
// End Feedback message


// Token Verification
function verifyToken(req, res, next) {
  let token = req.headers["authorizatrion"];
  const SECRET_KEY = "mysecretkey";
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, valid) => {
      if (err) {
        res.status(401).send("Something went wrong (Token)");
      } else {
        next();
      }
    });
  } else {
    res.status(401).send("Something went wrong (Token)");
  }
}

// End Token Verification


router.post("/DeleteMe", async (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  async function getuser(mobilenumber) {
    const existingUser = await User.findOne({ mobilenumber: mobilenumber });
    console.log(existingUser);
    if (existingUser === null) {
      return false;
    }
    return existingUser;
  }
  const user = await getuser(mobilenumber);

  if (!user) {
    res.status(400).json("Invalid Mobile Number");
  }


  if (user) {
    id = user._id;
    res.send({ "Res": `Dear user, your id: ${user._id} will be deleted with in 7 days after your confirmation. You will get call in 24 hours.` });
  }


});

module.exports = router;
