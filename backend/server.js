require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const productRoutes = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const categoryRoutes = require("./routes/categoryRoute");
const cartRoutes = require("./routes/cartRoute");
const orderRoutes = require("./routes/orderRoute");
const errorHandler = require("./middleware/error");

const app = express();

// ================= CORS =================
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ================= Middleware =================
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= Routes =================
app.get("/", (req, res) => {
  res.send("Ecommerce API Running");
});

app.use("/api/user", userRoute);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// ================= Error Handler =================
app.use(errorHandler);

// ================= MongoDB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// Development mein listen karo
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;