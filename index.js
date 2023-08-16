const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dbbszpcem",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cors());

const routeOffer = require("./routes/offer");
app.use(routeOffer);

app.get("/", (req, res) => {
  res.json("Bienvenue sur l'API Vinted de HD7594");
});

app.get("/new", (req, res) => {
  res.json({ message: "Une autre partie de cet API" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("server has started");
});
