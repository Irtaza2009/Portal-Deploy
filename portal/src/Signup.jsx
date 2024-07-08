import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

var local = "http://localhost:3007/register";
var deployed = "https://deploy-portal-api.vercel.app/register";

function Signup() {
  const [step, setStep] = useState(1); // State to manage form steps
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [salary, setSalary] = useState("");

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(deployed, {
        name,
        email,
        password,
        company,
        country,
        city,
        salary,
      })
      .then((result) => {
        toast.success("Registration successful!");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleNext = () => {
    const form = document.getElementById("signup-form");
    if (form.reportValidity()) {
      setStep(2);
    } else {
      toast.error("Please fill in all the required details.");
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    const form = document.getElementById("signup-form");
    if (form.reportValidity()) {
      handleSubmit(e);
    } else {
      toast.error("Please fill in all the required details.");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="form-container">
        <h2>Register</h2>
        <form id="signup-form">
          {step === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="name">
                  <strong>Name</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  autoComplete="off"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="button" className="btn-next" onClick={handleNext}>
                Continue →
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="company">
                  <strong>What is your current company name?</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  autoComplete="off"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">
                  <strong>Which Country are you currently working in:</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Country Name"
                  autoComplete="off"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">
                  <strong>Which City are you currently residing in:</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter City Name"
                  autoComplete="off"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">
                  <strong>What is your salary? (in Euros)</strong>
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="salary"
                  placeholder="In Euros"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="btn-previous"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="btn-register"
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </>
          )}
        </form>
        <p>Already Have an Account</p>
        <Link to="/login" className="link-button">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
