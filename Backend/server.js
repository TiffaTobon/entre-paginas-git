// server.js
const express = require('express');
const sequelize = require('./config/database.js');
const authRoutes = require('./routes/auth');
const librosRoutes = require('./routes/libros');
const transaccionesRoutes = require('./routes/transacciones');
const resenasRoutes = require('./routes/resenas');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/libros', librosRoutes);
app.use