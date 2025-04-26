import express from 'express';
import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const sequelize = new Sequelize('entrepaginas', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql'
});

const app = express();
app.use(express.json());

// Definir rutas y modelos...

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
  });
});


