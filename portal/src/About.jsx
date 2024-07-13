import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function About() {
  const navigate = useNavigate();

  const techiesData = [
    { name: "Ali Khan", city: "Berlin", company: "Google" },
    { name: "Ayesha Siddiqi", city: "London", company: "Amazon" },
    { name: "Hassan Ali", city: "Paris", company: "Facebook" },
    { name: "Fatima Ahmed", city: "Amsterdam", company: "Booking.com" },
  ];

  const renderTechie = (techie) => (
    <div className="techie-card" key={techie.name}>
      <h2>{techie.name}</h2>
      <p>
        <b>City:</b> {techie.city} <br />
        <b>Company:</b> {techie.company}
      </p>
    </div>
  );

  return (
    <div className="app-container">
      <h1>Pakistani Techies in 🇪🇺</h1>
      <p>
        We are a community of Pakistani tech professionals living in Europe. Our
        goal is to create a supportive network of individuals who share our
        cultural background and passion for innovation.
      </p>

      {techiesData.length > 0 ? (
        <div className="data-section">
          <h2>Sample Data</h2>
          <div className="techie-list">{techiesData.map(renderTechie)}</div>
        </div>
      ) : (
        <p>Data about Pakistani Techies in Europe is currently unavailable.</p>
      )}

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
          Login (For Full Access)
        </button>
      </div>
    </div>
  );
}

export default About;
