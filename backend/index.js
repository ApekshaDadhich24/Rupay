const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRouter = require("./routes/index");
const cors = require("cors");
const path = require("path");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

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

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is running on port: " + process.env.PORT);
});

const fs = require("fs");

app.get("/debug", (req, res) => {
  res.json({
    dirname: __dirname,
    publicExists: fs.existsSync(path.join(__dirname, "public")),
    assetsExists: fs.existsSync(path.join(__dirname, "public", "assets")),
    jsExists: fs.existsSync(
      path.join(__dirname, "public", "assets", "index-DxoZKpYW.js")
    ),
  });
});

// Wild card route to integrate frontend
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
