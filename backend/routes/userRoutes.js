const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  register,
  login,
  logout,
  getUser,
} = require('../controllers/authController');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Logout
router.get('/logout', logout);

// Get user
router.get('/user', authMiddleware, getUser);

module.exports = router;
