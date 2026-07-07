require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const Product = require("./model/Product");
const Category = require("./model/Category");

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB Connected");

    // Delete old demo data
    await Product.deleteMany({});
    await Category.deleteMany({});

    const categoryNames = [
      "Mobile",
      "Laptop",
      "Bike",
      "Refrigerator",
      "Air Conditioner",
      "Washing Machine",
      "Beauty",
      "Toys",
      "Furniture",
      "Camera",
      "Watch",
      "Kitchen",
    ];

    const categories = [];

    for (let name of categoryNames) {
      const category = await Category.create({ name });
      categories.push(category);
    }

    const products = [];

    for (let i = 1; i <= 2500; i++) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      products.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 500, max: 500000 }),
        stock: faker.number.int({ min: 1, max: 200 }),
        image: `https://picsum.photos/400/400?random=${i}`,
        category: randomCategory._id,
      });
    }

    await Product.insertMany(products);

    console.log("2500 Products Inserted Successfully");
    process.exit();
  })
  .catch((err) => console.log(err));