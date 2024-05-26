const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product");

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!", err);
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  try {
    await createdProduct.save();
    res.status(201).json({ message: "Product created!", product: createdProduct });
  } catch (err) {
    res.status(500).json({ message: "Creating the product failed." });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetching products failed." });
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
