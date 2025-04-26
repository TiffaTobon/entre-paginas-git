// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  const hashedPassword = await bcrypt.hash(contrasena, 10);
  const usuario = await Usuario.create({ nombre, email, contrasena: hashedPassword });
  res.status(201).json(usuario);
});

router.post('/login', async (req, res) => {
  const { email, contrasena } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario || !await bcrypt.compare(contrasena, usuario.contrasena)) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ id: usuario.id }, 'secret_key');
  res.json({ token });
});

export default router;

