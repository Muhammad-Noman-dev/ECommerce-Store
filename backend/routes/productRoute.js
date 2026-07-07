const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { 
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct 
} = require("../controller/productController");

const protect = require("../middleware/protect");
const admin = require("../middleware/admin");

// Public Routes
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
// Admin Routes
router.post("/create", protect, admin, upload.single("image"), createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;