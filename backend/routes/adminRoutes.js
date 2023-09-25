const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const roleMiddleware = require('../middleware/roleMiddleware');

// Admin Routes
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  adminController.createAdmin
);
router.get('/', adminController.getAdmins);
router.get('/:id', adminController.getAdminById);
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  adminController.updateAdmin
);
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  adminController.deleteAdmin
);

module.exports = router;
