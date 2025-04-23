import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/routes"; // Importa tus rutas
import ChatBox from './components/chat/ChatBox'; // Importa el componente ChatBox

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Bienvenido al sistema de chat</h1>
        {/* El componente ChatBox lo puedes incluir en cualquier lugar aquí */}
        <ChatBox />
        <RoutesComponent />
      </div>
    </Router>
  );
};

export default App;
