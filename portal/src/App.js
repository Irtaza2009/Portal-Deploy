import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const [company, setCompany] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [salary, setSalary] = useState();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://deploy-portal-api.vercel.app/register", {
        name,
        email,
        password,
        company,
        country,
        city,
        salary,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-80">
        <div className="bg-white p-3 rounded w-25">
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className="row g-3 needs-validation">
            <div className="mb-2">
              <label htmlFor="email">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="email">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-1 d-flex justify-content-left">
              <label>
                <strong>What is your current company name?</strong>
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  autoComplete="off"
                  name="company"
                  className="form-control rounded-0"
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="mb-1 d-flex justify-content-left">
              <label>
                <strong>Which Country are you currently working in:</strong>
                <input
                  type="text"
                  placeholder="Enter Country Name"
                  autoComplete="off"
                  name="country"
                  className="form-control rounded-0"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-1 d-flex justify-content-left">
              <label>
                <strong>Which City are you currently residing in:</strong>
                <input
                  type="text"
                  placeholder="Enter City Name"
                  autoComplete="off"
                  name="city"
                  className="form-control rounded-0"
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
            </div>

            <div className="mb-1 d-flex justify-content-left">
              <label>
                <strong>What is your salary? (in Euros)</strong>

                <input
                  type="text"
                  autoComplete="off"
                  name="salary"
                  className="form-control rounded-0"
                  placeholder="In Euros"
                  onChange={(e) => setSalary(e.target.value)}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Register
            </button>
          </form>
          <p>Already Have an Account</p>
          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
