const express = require("express");
const router = express.Router();

const modelOffer = require("../models/Offer");

const cloudinary = require("cloudinary").v2;

const fileUpload = require("express-fileupload");

cloudinary.config({
  cloud_name: "dbbszpcem",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const convertToBase64 = require("../utils/convertToBase64");

router.post("/offer/publish", fileUpload(), async (req, res) => {
  try {
    const { title, description, price, condition, city, brand, size, color } =
      req.body;

    const productPicture = req.files.picture;

    const publishPicture = await cloudinary.uploader.upload(
      convertToBase64(productPicture)
    );

    const newModelOffer = new modelOffer({
      product_name: title,
      product_description: description,
      product_price: Number(price),
      product_details: [
        { MARQUE: brand },
        { TAILLE: size },
        { ÉTAT: condition },
        { VILLE: city },
        { COULEUR: color },
      ],
      product_image: publishPicture,

      owner: req.user,
    });
    await newModelOffer.save();
    res.json(newModelOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/offers", async (req, res) => {
  try {
    let filters = {};
    if (req.query.title) {
      filters.product_name = new RegExp(product_title, "i");
    }
    if (req.query.priceMin) {
      filters.product_price = {
        $gte: req.query.priceMin,
      };
    }
    if (req.query.priceMax) {
      filters.product_price.$lte = req.query.priceMax;
    } else {
      filters.product_price = {
        $lte: req.query.priceMax,
      };
    }

    let sort = {};
    if (req.query.sort === "price-desc") {
      sort = { product_price: -1 };
    }
    if (req.query.sort === "price-asc") {
      sort = { product_price: 1 };
    }

    let page;
    if (Number(req.query.page) < 1) {
      page = 1;
    }
    if (Number(req.query.page) > 1) {
      page = Number(req.query.page);
    }

    let limit = Number(req.query.limit);

    const count = await modelOffer.countDocuments(filters);

    const offers = await modelOffer
      .find(filters)
      .populate({ path: "owner", select: "account" })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      count: count,
      offers: offers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/offer/:id", async (req, res) => {
  try {
    const idOffer = await modelOffer.findById(req.params.id).populate({
      path: "owner",
      select: "account.username account.phone account.avatar",
    });
    res.status(200).json(idOffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
