// models/Libro.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Libro = sequelize.define('Libro', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING, allowNull: true },
  descripcion: { type: DataTypes.TEXT, allowNull: true },
  autor: { type: DataTypes.STRING, allowNull: true },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  imagen: { type: DataTypes.TEXT, allowNull: true },
  stock: { type: DataTypes.INTEGER, allowNull: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: 'Usuario', key: 'id' } }
});

export default Libro;




  