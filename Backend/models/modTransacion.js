// models/Transaccion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaccion = sequelize.define('Transaccion', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipo: { type: DataTypes.ENUM('compra', 'intercambio'), allowNull: false },
  comprador_id: { type: DataTypes.INTEGER, references: { model: 'Usuarios', key: 'id' } },
  vendedor_id: { type: DataTypes.INTEGER, references: { model: 'Usuarios', key: 'id' } },
  libro_id: { type: DataTypes.INTEGER, references: { model: 'Libros', key: 'id' } },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  estado: { type: DataTypes.ENUM('pendiente', 'completada', 'cancelada'), allowNull: false },
  recibo: { type: DataTypes.TEXT, allowNull: true },
  metodo_pago: { type: DataTypes.ENUM('virtual', 'intercambio'), allowNull: false }
});

module.exports = Transaccion;
  