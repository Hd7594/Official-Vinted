const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      console.log(token);
      const isExisted = await User.findOne({ token: token }).select(
        "account _id"
      );
      if (isExisted) {
        console.log(isExisted);
        next();
      } else {
        return res.status(401).json({ message: "unauthorized-" });
      }
    } else {
      return res.status(401).json({ message: "not found" });
    }

    // console.log("Okay");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = isAuthenticated;
