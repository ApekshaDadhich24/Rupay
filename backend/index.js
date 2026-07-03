const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://rupay-ten.vercel.app", // Production frontend
    ],
    credentials: true,
  }),
);

app.use("/api/v1", mainRouter);

// /api/v1/user/signup
// /api/v1/user/signin

// /api/v1/account/transferMoney
// /api/v1/account/balance
// /api/v1/account/history

//database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

app.get("/", (req, res) => {
  res.json("Server is up and running");
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is running on port: " + process.env.PORT);
});
