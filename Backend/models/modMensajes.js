// models/Mensaje.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Mensaje = sequelize.define('Mensaje', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  emisor_id: { type: DataTypes.INTEGER, references: { model: 'Usuario', key: 'id' } },
  receptor_id: { type: DataTypes.INTEGER, references: { model: 'Usuario', key: 'id' } },
  mensaje: { type: DataTypes.TEXT, allowNull: true },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Mensaje;