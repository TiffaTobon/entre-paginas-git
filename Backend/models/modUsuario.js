// models/Usuario.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true, unique: true },
  contrasena: { type: DataTypes.STRING, allowNull: true }
});

export default Usuario;











