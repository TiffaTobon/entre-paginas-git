// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('entre_paginas', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
