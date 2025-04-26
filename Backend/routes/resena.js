// routes/resenas.js
import express from 'express';
import Resena from '../models/Resena.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/:idLibro', verifyToken, async (req, res) => {
  const { usuario_id, calificacion, comentario } = req.body;
  const resena = await Resena.create({ usuario_id, libro_id: req.params.idLibro, calificacion, comentario });
  res.status(201).json(resena);
});

router.get('/:idLibro', async (req, res) => {
  const resenas = await Resena.findAll({ where: { libro_id: req.params.idLibro } });
  res.json(resenas);
});

export default router;


