/*

const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

mongoose.connect("mongodb://localhost/vinted-user");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());

cloudinary.config({
  cloud_name: "dbbszpcem",
  api_key: "152421262498747",
  api_secret: "Ibn2ckCSppFAQpS5at5pW_cANiQ",
});

const offerRoutes = require("./routes/offer");

app.use(offerRoutes);

app.listen(3000, (req, res) => {
  console.log("server is Ok");
});

*/

const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/vinted-user");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dbbszpcem",
  api_key: "152421262498747",
  api_secret: "Ibn2ckCSppFAQpS5at5pW_cANiQ",
});

app.use(express.json());
app.use(cors());

const routeOffer = require("./routes/offer");
app.use(routeOffer);

app.listen(3000, (req, res) => {
  console.log("server has started");
});
