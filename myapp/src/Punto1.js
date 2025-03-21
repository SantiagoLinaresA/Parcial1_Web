import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import headerImage from "./imagenes/robo1.png";

const Punto1 = () => {
  const { t } = useTranslation(); // Hook para traducciones
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redirección

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        navigate("/punto2");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "800px" }}>
        <div className="text-center">
          <img src={headerImage} alt="Adopta un Robot" className="img-fluid mb-3" />
          <h2 className="fw-bold text-dark">{t("header")}</h2>
        </div>

        <h3 className="text-center">{t("login.title")}</h3>
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">{t("login.username")}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t("login.username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{t("login.password")}</label>
            <input
              type="password"
              className="form-control"
              placeholder={t("login.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">{t("login.loginButton")}</button>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={() => { setUsername(""); setPassword(""); setError(""); }}
            >
              {t("login.cancelButton")}
            </button>
          </div>
        </form>

        <p className="text-center mt-3 small">{t("contact")}</p>
      </div>
    </div>
  );
};

export default Punto1;
