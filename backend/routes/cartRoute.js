const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controller/cartController");

const protect = require("../middleware/protect");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.post("/remove", protect, removeFromCart);

module.exports = router;

