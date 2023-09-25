const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Product Routes
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  productController.createProduct
);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  productController.updateProduct
);
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  productController.deleteProduct
);

module.exports = router;
