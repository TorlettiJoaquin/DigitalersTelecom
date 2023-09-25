const Product = require('../models/Product');

// Get all products
exports.getProducts = async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Get single product
exports.getProductById = async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Delete product
exports.deleteProduct = async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted a product' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Create product
exports.createProduct = async function createProduct(req, res) {
  try {
    const { product_id, title, price, description, content, images, category } =
      req.body;
    if (
      !product_id ||
      !title ||
      !price ||
      !description ||
      !content ||
      !category ||
      !images
    )
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Update product
exports.updateProduct = async function updateProduct(req, res) {
  try {
    const { product_id, title, price, description, content, images, category } =
      req.body;
    if (
      !product_id ||
      !title ||
      !price ||
      !description ||
      !content ||
      !category ||
      !images
    )
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
