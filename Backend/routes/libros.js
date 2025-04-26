// routes/libros.js
import express from 'express';
import Libro from '../models/Libro.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const libro = await Libro.create(req.body);
  res.status(201).json(libro);
});

router.get('/', async (req, res) => {
  const libros = await Libro.findAll();
  res.json(libros);
});

router.put('/:id', verifyToken, async (req, res) => {
  const libro = await Libro.update(req.body, { where: { id: req.params.id } });
  res.json(libro);
});

router.delete('/:id', verifyToken, async (req, res) => {
  await Libro.destroy({ where: { id: req.params.id } });
  res.status(204).end();
});

export default router;
