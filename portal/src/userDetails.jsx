// Home.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


var local = "http://localhost:3007/userData";
var deployed = "https://deploy-portal-api.vercel.app/userData";

function userDetails() {
  const [user, setUser] = useState([]);


  const [admin, setAdmin] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .post(local)
      .then((result) => {
        console.log(result.data);
        if (result.data === "You are authenticated") {
          axios
            .get(deployedGet)
            .then((response) => {
              setUsers(response.data);
              console.log(response.data);
              if (response.data.userType === "admin") {
                setAdmin("admin");
              }
            })
            .catch((err) => console.log(err));
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);




  return (
   
  );
}

export default userDetails;
