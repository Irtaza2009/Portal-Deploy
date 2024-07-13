// About.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

function About() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1>Pakistani Techies in 🇪🇺</h1>
      <p>
        We are a community of Pakistani tech professionals living in Europe. Our
        goal is to create a supportive network of individuals who share our
        cultural background and passion for innovation. Join us to connect with
        like-minded individuals and explore opportunities in Europe's tech
        scene.
      </p>
      <div className="button-group">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/register")}
        >
          <FontAwesomeIcon icon={faUsers} className="icon" />
          Join Now
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/login")}
        >
          <FontAwesomeIcon icon={faSignInAlt} className="icon" />
          Login
        </button>
      </div>
    </div>
  );
}

export default About;
