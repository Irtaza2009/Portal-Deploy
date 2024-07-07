import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { loggedIn } from "./Login";

function Home() {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("https://deploy-portal-api.vercel.app/getUsers")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const sortUsers = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedUsers = [...users].sort((a, b) => {
      let valueA = a[key] || ""; // Default to empty string if undefined
      let valueB = b[key] || "";

      // Handle numeric sorting for salary (assuming it's stored as string)
      if (key === "salary") {
        valueA = parseFloat(valueA.replace(/,/g, "") || 0); // Convert string to number (remove commas)
        valueB = parseFloat(valueB.replace(/,/g, "") || 0);
      } else {
        // Handle string comparison for other fields
        valueA = valueA.toString().toLowerCase();
        valueB = valueB.toString().toLowerCase();
      }

      if (valueA < valueB) {
        return direction === "ascending" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  const getArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " \u2191" : " \u2193";
    }
    return "";
  };

  if (loggedIn) {
    return (
      <div className="container">
        <ToastContainer />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => sortUsers("name")}>
                  Name{getArrow("name")}
                </th>
                <th onClick={() => sortUsers("company")}>
                  Company{getArrow("company")}
                </th>
                <th onClick={() => sortUsers("country")}>
                  Country{getArrow("country")}
                </th>
                <th onClick={() => sortUsers("city")}>
                  City{getArrow("city")}
                </th>
                <th onClick={() => sortUsers("salary")}>
                  Salary{getArrow("salary")}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.company}</td>
                  <td>{user.country}</td>
                  <td>{user.city}</td>
                  <td>{user.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
}

export default Home;
