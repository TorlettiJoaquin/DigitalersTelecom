// Registro de usuarios
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

async function register(req, res) {
  try {
    let { username, email, password, passwordCheck } = req.body;

    // validate
    if (!username || !email || !password || !passwordCheck)
      return res.status(400).json({ msg: 'Not all fields have been entered.' });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: 'The password needs to be at least 6 characters long.' });

    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: 'Enter the same password twice for verification.' });

    // check for existing user
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: 'An account with this email already exists.' });

    if (!username) username = email;

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role: 'user',
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser, { msg: 'User created successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'No se pudo registar al usuario:', error: err.message });
  }
}

// Login de usuarios
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: 'No account with this email has been registered.' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ msg: 'Invalid credentials.' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Logout de usuarios
async function logout(req, res) {
  try {
    if (!req.cookies.token)
      return res.status(400).json({ msg: 'No user logged in.' });
    res.cookie('token', '', { maxAge: 1 });
    res.status(200).json({ msg: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtener datos de usuarios
async function getUser(req, res) {
  try {
    const user = await User.findById(req.user);
    res.json({
      username: user.username,
      id: user._id,
      role: user.role,
    });
  } catch (err) {
    res.send({ error: err.message });
  }
}

module.exports = {
  register,
  login,
  logout,
  getUser,
};
