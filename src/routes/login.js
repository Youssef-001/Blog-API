const express = require("express"); // Import express
const router = express.Router(); // Create a router instance
require("dotenv").config();
const user_queries = require("../queries/user_queries");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  try {
    let user = await user_queries.get_user(req.body.username);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ access_token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
