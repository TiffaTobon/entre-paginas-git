// routes/notificaciones.js
import express from 'express';
import Notificacion from '../models/Notificacion.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const notificacion = await Notificacion.create(req.body);
  res.status(201).json(notificacion);
});

router.get('/:id', verifyToken, async (req, res) => {
  const notificaciones = await Notificacion.findAll({ where: { usuario_id: req.params.id } });
  res.json(notificaciones);
});

export default router;
