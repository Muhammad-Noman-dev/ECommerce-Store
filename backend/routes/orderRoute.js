const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");



const {
  createOrder,
  getMyOrders,
   getAllOrders,
  updateOrderStatus,
} = require("../controller/orderController");

const protect = require("../middleware/protect");

router.post("/create", protect, createOrder);        // User order place
router.get("/all", protect, admin, getAllOrders);   // Admin orders dekhne ke liye
;


// Admin routes
router.get("/all", protect, admin, getAllOrders);

router.put("/status/:id", protect, admin, updateOrderStatus);

module.exports = router;