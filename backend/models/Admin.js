const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    role: {
      type: String,
      default: 'admin',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
