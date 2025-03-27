import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/routes"; // Importa tus rutas

const App = () => {
  return (
    <Router>
      <RoutesComponent />
    </Router>
  );
};

export default App;