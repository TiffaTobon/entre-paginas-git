// server.js
import express from 'express';
import sequelize from './db.js';
import authRoutes from './routes/auth.js';
import libroRoutes from './routes/libros.js';
import transaccionRoutes from './routes/transacciones.js';
import resenaRoutes from './routes/resenas.js';
import mensajeRoutes from './routes/mensajes.js';
import notificacionRoutes from './routes/notificaciones.js';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/libros', libroRoutes);
app.use('/transacciones', transaccionRoutes);
app.use('/resenas', resenaRoutes);
app.use('/mensajes', mensajeRoutes);
app.use('/notificaciones', notificacionRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
  });
});
