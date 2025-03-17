import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import headerImage from "./imagenes/robo1.png";

const Punto2 = () => {
  const { t } = useTranslation(); // Hook para traducciones
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
      <h2 className="fw-bold">{t("header")}</h2>

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
                <th>{t("table.id")}</th>
                <th>{t("table.name")}</th>
                <th>{t("table.model")}</th>
                <th>{t("table.company")}</th>
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
              <p><strong>{t("table.model")}:</strong> {robotSeleccionado.modelo}</p>
              <p><strong>{t("table.company")}:</strong> {robotSeleccionado.empresaFabricante}</p>
              <p><strong>{t("details.year")}:</strong> {robotSeleccionado.añoFabricacion}</p>
              <p><strong>{t("details.processing")}:</strong> {robotSeleccionado.capacidadProcesamiento}</p>
              <p><strong>{t("details.additional")}:</strong> {robotSeleccionado.humor}</p>
            </div>
          ) : (
            <p className="text-muted">{t("details.selectRobotMessage", "Haz clic en un robot para ver los detalles.")}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-3">
        <p>{t("contact")}</p>
      </footer>
    </div>
  );
};

export default Punto2;
