// routes/transacciones.js
import express from 'express';
import Transaccion from '../models/Transaccion.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/compra', verifyToken, async (req, res) => {
  const { comprador_id, vendedor_id, libro_id } = req.body;
  const transaccion = await Transaccion.create({ tipo: 'compra', comprador_id, vendedor_id, libro_id, estado: 'completada' });
  res.status(201).json(transaccion);
});

router.post('/intercambio', verifyToken, async (req, res) => {
  const { comprador_id, vendedor_id, libro_id } = req.body;
  const transaccion = await Transaccion.create({ tipo: 'intercambio', comprador_id, vendedor_id, libro_id, estado: 'pendiente' });
  res.status(201).json(transaccion);
});

export default router;

