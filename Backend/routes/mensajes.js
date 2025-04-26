// routes/mensajes.js
import express from 'express';
import Mensaje from '../models/Mensaje.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const mensaje = await Mensaje.create(req.body);
  res.status(201).json(mensaje);
});

router.get('/:id', verifyToken, async (req, res) => {
  const mensajes = await Mensaje.findAll({ where: { receptor_id: req.params.id } });
  res.json(mensajes);
});

export default router;
