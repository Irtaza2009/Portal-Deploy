import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faSignInAlt,
  faShare,
  faCopy,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function About() {
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const urlToCopy = window.location.href;

  const copyUrlToClipboard = () => {
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => setCopySuccess(true))
      .catch((err) => console.error("Failed to copy:", err));
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  return (
    <div className="app-container">
      <ToastContainer />
      <header className="about-header">
        <h1>Pakistani Techies in 🇪🇺</h1>
        <p>
          We are a community of Pakistani tech professionals living in Europe.
          Our goal is to create a supportive network of individuals who share
          our cultural background and passion for innovation. Join us to connect
          with like-minded individuals and explore opportunities in Europe's
          tech scene.
        </p>
      </header>
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
        <button className="btn btn-secondary" onClick={togglePopover}>
          <FontAwesomeIcon icon={faShare} className="icon" />
          Share
        </button>
      </div>
      {showPopover && (
        <div className="popover">
          <FontAwesomeIcon
            icon={faTimes}
            className="close"
            onClick={closePopover}
          />
          <input type="text" className="url-input" value={urlToCopy} readOnly />
          <button className="copy-button" onClick={copyUrlToClipboard}>
            <FontAwesomeIcon icon={faCopy} /> Copy URL
          </button>
          <div className="social-icons">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                urlToCopy
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                urlToCopy
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                urlToCopy
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
