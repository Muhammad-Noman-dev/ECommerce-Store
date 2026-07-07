const express = require("express");
const router = express.Router();

const { 
  createCategory,
  getAllCategories,
  deleteCategory, } = require("../controller/categoryController");
const protect = require("../middleware/protect");
const admin = require("../middleware/admin");

router.post("/create", protect, admin, createCategory);

router.get("/", getAllCategories);

router.delete("/:id", protect, admin, deleteCategory);

module.exports = router;