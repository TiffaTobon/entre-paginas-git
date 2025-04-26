// models/Transaccion.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Transaccion = sequelize.define('Transaccion', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipo: { type: DataTypes.ENUM('compra', 'intercambio'), allowNull: true },
  comprador_id: { type: DataTypes.INTEGER, references: { model: 'Usuario', key: 'id' } },
  vendedor_id: { type: DataTypes.INTEGER, references: { model: 'Usuario', key: 'id' } },
  libro_id: { type: DataTypes.INTEGER, references: { model: 'Libro', key: 'id' } },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  estado: { type: DataTypes.ENUM('pendiente', 'completada', 'cancelada'), allowNull: true },
  recibo: { type: DataTypes.TEXT, allowNull: true },
  metodo_pago: { type: DataTypes.ENUM('virtual', 'intercambio'), allowNull: true }
});

export default Transaccion;
  