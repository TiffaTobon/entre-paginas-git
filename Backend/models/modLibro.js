// models/Libro.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Libro = sequelize.define('Libro', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  autor: { type: DataTypes.STRING, allowNull: false },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  imagen: { type: DataTypes.TEXT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  usuario_id: { type: DataTypes.INTEGER, references: { model: 'Usuarios', key: 'id' } }
});

module.exports = Libro;




  