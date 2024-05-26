const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
    res.status(201).json({ message: "Product created!", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Creating the product failed." });
  } finally {
    await client.close();
  }
};

const getProducts = async (req, res) => {
  const client = new MongoClient(url);

  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
    res.status(200).json({ products: products });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Getting products failed." });
  } finally {
    await client.close();
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
