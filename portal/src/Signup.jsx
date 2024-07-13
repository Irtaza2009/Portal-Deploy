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

  const [userType, setUserType] = useState("");
  const [passKey, setPassKey] = useState("");

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "Admin" && passKey !== "SuperDuperUser") {
      toast.error("Invalid Passkey");
    } else {
      axios
        .post(deployed, {
          name,
          email,
          password,
          company,
          country,
          city,
          salary,
          userType,
        })
        .then((result) => {
          toast.success("Registration successful!");
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred. Please try again.");
        });
    }
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
          <div
            className="progress-bar"
            style={{ width: step === 1 ? "50%" : "100%" }}
          ></div>
          {step === 1 && (
            <>
              <div className="form-group">
                <label>Register As</label>
                <div>
                  <input
                    type="radio"
                    name="UserType"
                    autoComplete="off"
                    value="User"
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  />
                  User
                  <input
                    type="radio"
                    name="UserType"
                    autoComplete="off"
                    value="Admin"
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  />
                  Admin
                </div>
              </div>
              {userType === "Admin" && (
                <div className="form-group">
                  <label>PassKey</label>
                  <input
                    type="text"
                    placeholder="Enter Passkey"
                    autoComplete="off"
                    name="passkey"
                    value={passKey}
                    onChange={(e) => setPassKey(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Name</label>
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
                <label htmlFor="email">Email</label>
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
                <label htmlFor="password">Password</label>
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
                <label htmlFor="company">Company Name</label>
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
                <label htmlFor="country">Country</label>
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
                <label htmlFor="city">City</label>
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
                <label htmlFor="salary">Salary (in Euros)</label>
                <input
                  type="number"
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
        <p>Already Have an Account?</p>
        <Link to="/login" className="link-button">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
