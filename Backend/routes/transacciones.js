// routes/transacciones.js
const express = require('express');
const Transaccion = require('../models/Transaccion');
const Libro = require('../models/Libro');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/compra', verifyToken, async (req, res) => {
  const { libro_id, comprador_id, vendedor_id } = req.body;
  const libro = await Libro.findByPk(libro_id);
  if (libro.stock <= 0) {
    return res.status(400).json({ message: 'Stock insuficiente' });
  }
  const transaccion = await Transaccion.create({ tipo: 'compra', comprador_id, vendedor_id, libro_id, estado: 'completada' });
  libro.stock -= 1;
  await libro.save();
  res.status(201).json(transaccion);
});

router.post('/intercambio', verifyToken, async (req, res) => {
  const { libro_id, comprador_id, vendedor_id } = req.body;
  const transaccion = await Transaccion.create({ tipo: 'intercambio', comprador_id, vendedor_id, libro_id, estado: 'pendiente' });
  res.status(201).json(transaccion);
});

module.exports = router;
