// models/Notificacion.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Notificacion = sequelize.define('Notificacion', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: 'Usuario', key: 'id' } },
  tipo: { type: DataTypes.ENUM('mensaje', 'intercambio', 'compra'), allowNull: true },
  contenido: { type: DataTypes.TEXT, allowNull: true },
  leida: { type: DataTypes.BOOLEAN, defaultValue: false },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Notificacion;