import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1>Pakistani Techies in 🇪🇺</h1>
      <p>
        We are a community of Pakistani tech professionals living in Europe. Our
        goal is to create a supportive network of individuals who share our
        cultural background and passion for innovation. Please register or login
        to view the data of Pakistani Techies in Europe 🇪🇺 🙏!
      </p>
      <div className="button-group">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default About;
