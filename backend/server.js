// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const helmet = require("helmet");

// const productRoutes = require("./routes/productRoute");
// const userRoute = require("./routes/userRoute");
// const categoryRoutes = require("./routes/categoryRoute");
// const cartRoutes = require("./routes/cartRoute");
// const orderRoutes = require("./routes/orderRoute");
// const errorHandler = require("./middleware/error");

// const app = express();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// app.use(helmet());
// app.use(express.json());

// // Static Files with proper headers
// app.use("/uploads", express.static("uploads", {
//   setHeaders: (res) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
//   }
// }));

// // Routes
// app.use("/api/user", userRoute);
// app.use("/api/product", productRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/order", orderRoutes);

// app.use(errorHandler);

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("✅ MongoDB Connected");
//         console.log("Host:", mongoose.connection.host);
//         console.log("Database Name:", mongoose.connection.name);
//     })
//     .catch((err) => {
//         console.error("❌ MongoDB Connection Error:", err);
//         process.exit(1);
//     });

// app.get("/", (req, res) => {
//   res.send("Ecommerce API Running");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 SERVER IS RUNNING ON ${PORT}`);
// });


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
const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-store-mc6e.vercel.app",
];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS Not Allowed"));
//       }
//     },
//     credentials: true,
//   })
// );
const cors = require("cors");

app.use(cors({
  origin: true,
  credentials: true,
}));
// ================= Middleware =================
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= Static Uploads =================
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

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

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server Running On Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });