import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import headerImage from "./imagenes/robo1.png";

const Punto2 = () => {
  const [robots, setRobots] = useState([]);
  const [robotSeleccionado, setRobotSeleccionado] = useState(null);
  const [error, setError] = useState("");

  // Cargar la lista de robots al montar el componente
  useEffect(() => {
    fetch("http://localhost:3001/robots")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de robots.");
        }
        return response.json();
      })
      .then((data) => setRobots(data))
      .catch((error) => setError(error.message));
  }, []);

  // Obtener detalles de un robot
  const seleccionarRobot = (robotId) => {
    setError(""); // Limpiar errores anteriores
    fetch(`http://localhost:3001/robots/${robotId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("El robot seleccionado no fue encontrado.");
        }
        return response.json();
      })
      .then((data) => setRobotSeleccionado(data))
      .catch((error) => setError(error.message));
  };

  return (
    <div className="container mt-4 text-center">
      <h2 className="fw-bold">Adopta un Robot con Robot Lovers!</h2>

      {/* Imagen de encabezado */}
      <div className="my-3">
        <img src={headerImage} alt="Robots" className="img-fluid w-75" />
      </div>

      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {/* Tabla de robots */}
        <div className="col-md-6">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>Empresa Fabricante</th>
              </tr>
            </thead>
            <tbody>
              {robots.map((robot) => (
                <tr
                  key={robot.id}
                  onClick={() => seleccionarRobot(robot.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{robot.id}</td>
                  <td>{robot.nombre}</td>
                  <td>{robot.modelo}</td>
                  <td>{robot.empresaFabricante}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detalles del robot seleccionado */}
        <div className="col-md-6">
          {robotSeleccionado ? (
            <div className="card p-3 shadow">
              <h3 className="fw-bold">{robotSeleccionado.nombre}</h3>
              {/* Imagen centrada */}
              <div className="d-flex justify-content-center">
                <img
                  src={robotSeleccionado.imagen}
                  alt={robotSeleccionado.nombre}
                  className="img-fluid w-50 mb-3"
                />
              </div>
              <p><strong>Modelo:</strong> {robotSeleccionado.modelo}</p>
              <p><strong>Empresa:</strong> {robotSeleccionado.empresaFabricante}</p>
              <p><strong>Año de Fabricación:</strong> {robotSeleccionado.añoFabricacion}</p>
              <p><strong>Procesador:</strong> {robotSeleccionado.capacidadProcesamiento}</p>
              <p><strong>Descripción:</strong> {robotSeleccionado.humor}</p>
            </div>
          ) : (
            <p className="text-muted">Haz clic en un robot para ver los detalles.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-3">
        <p>Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
      </footer>
    </div>
  );
};

export default Punto2;
