// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  const hashedPassword = await bcrypt.hash(contraseña, 10);
  const usuario = await Usuario.create({ nombre, email, contraseña: hashedPassword });
  res.status(201).json(usuario);
});

router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario || !await bcrypt.compare(contraseña, usuario.contraseña)) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }
  const token = jwt.sign({ id: usuario.id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
