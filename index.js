const express = require("express");
const app = express();
var cors = require("cors");
const { default: mongoose, connection } = require("mongoose");

const PORT = process.env.PORT | 5000;
app.use(express.json());
app.use(cors());


const userController = require("./routes/users/userController");
const landController = require("./routes/lands/landController");
const notifications = require("./routes/notifications/notificationController");
const payments = require("./routes/payments/razorpayPayment");

app.get("/", (req, res) => {
  res.json({ message: "Hello, from backend" });
});
app.use("/api/userController", userController);
app.use("/api/landController", landController);
app.use("/api/notifications", notifications);
app.use("/api/payment", payments);

// Database Connection
const uri =
  "mongodb+srv://indiansoftcenter:nKVdyL05wkulo5ss@cluster0.quensmw.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);
connection.once("open", () => {
  console.log("Database Connected");
});

// Database Connections

app.listen(PORT, () => {
  console.log("Server Running!!", PORT);
});
