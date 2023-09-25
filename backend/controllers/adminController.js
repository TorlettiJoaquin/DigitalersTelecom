// registro de admins
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

async function register(req, res) {
  try {
    let { username, email, password, passwordCheck } = req.body;

    // validate
    if (!username || !email || !password || !passwordCheck)
      return res
        .status(400)
        .json({ msg: 'No todos los campos han sido ingresados.' });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: 'La contraseña debe tener al menos 6 caracteres.' });

    if (password !== passwordCheck)
      return res.status(400).json({
        msg: 'Ingrese la misma contraseña dos veces para verificación.',
      });

    // check for existing user
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin)
      return res
        .status(400)
        .json({ msg: 'Ya existe una cuenta con este correo electrónico.' });

    if (!username) username = email;

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new admin account to the db
    const newAdmin = new Admin({
      username,
      email,
      password: passwordHash,
      role: 'admin',
    });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin, { msg: 'Usuario creado correctamente' });
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'No se pudo registar al usuario:', error: err.message });
  }
}

// Login de admins
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin)
      return res
        .status(400)
        .json({ msg: 'No existe una cuenta con este correo electrónico.' });

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch)
      return res.status(400).json({ msg: 'Contraseña incorrecta.' });

    const token = jwt.sign({ id: admin._id }, config.jwtSecret, {
      expiresIn: '1h',
    });
    res.status(200).json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Logout de admins
async function logout(req, res) {
  try {
    if (!req.cookies.token)
      return res.status(400).json({ msg: 'No hay sesión activa.' });

    res
      .cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
  logout,
};
