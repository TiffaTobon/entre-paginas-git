// models/Resena.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resena = sequelize.define('Resena', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: 'Usuarios', key: 'id' } },
  libro_id: { type: DataTypes.INTEGER, references: { model: 'Libros', key: 'id' } },
  calificacion: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comentario: { type: DataTypes.TEXT, allowNull: false },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Resena;

  