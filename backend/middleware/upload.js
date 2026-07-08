const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();   // ← Ye line important hai

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only jpg, jpeg, png, webp images allowed!"));
  }
});

module.exports = upload;