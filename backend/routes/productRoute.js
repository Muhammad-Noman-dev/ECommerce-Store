const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const protect = require("../middleware/protect");
const admin = require("../middleware/admin");

// Public Routes
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// Admin Routes — wrapped upload with error handling
router.post("/create", protect, admin, (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(500).json({
        success: false,
        message: `Image upload failed: ${err.message}`,
      });
    }
    next();
  });
}, createProduct);

router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;