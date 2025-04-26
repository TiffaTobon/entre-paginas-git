// models/Resena.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Resena = sequelize.define('Resena', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: 'Usuario', key: 'id' } },
  libro_id: { type: DataTypes.INTEGER, references: { model: 'Libro', key: 'id' } },
  calificacion: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 1, max: 5 } },
  comentario: { type: DataTypes.TEXT, allowNull: true },
  fecha: { type: DataTypes.DATE, allowNull: true }
});

export default Resena;


  