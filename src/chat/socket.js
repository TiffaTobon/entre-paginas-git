// src/chat/socket.js
import { io } from "socket.io-client";

// Esto se puede cambiar a la URL real del backend cuando esté listo
const SOCKET_URL = "http://localhost:3001"; // simulado por ahora

// Conexión con el servidor de Socket.IO
const socket = io(SOCKET_URL, {
  autoConnect: false, // evita conectar automáticamente hasta que el usuario inicie sesión, por ejemplo
});

export default socket;
