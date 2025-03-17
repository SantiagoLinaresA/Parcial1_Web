import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Punto1 from "./Punto1";
import Punto2 from "./punto2";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Punto1 />} />
        <Route path="/punto2" element={<Punto2 />} />
      </Routes>
    </Router>
  );
}

export default App;
