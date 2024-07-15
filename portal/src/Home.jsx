import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var local = "http://localhost:3007/home";
var deployedHome = "https://deploy-portal-api.vercel.app/home";

var localGet = "http://localhost:3007/getUsers";
var deployedGet = "https://deploy-portal-api.vercel.app/getUsers";

var localLogOut = "http://localhost:3007/logout";
var deployedLogOut = "https://deploy-portal-api.vercel.app/logout";

function Home() {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(deployedHome)
      .then((result) => {
        if (result.data === "You are authenticated") {
          axios
            .get(deployedGet)
            .then((response) => {
              setUsers(response.data);
            })
            .catch((err) => {
              console.error("Error fetching users:", err);
              toast.error("Failed to fetch user data. Please try again.");
            });
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Authentication error:", err);
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    axios
      .get(deployedLogOut)
      .then((res) => {
        if (res.data.status) {
          console.log(res.data);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
        toast.error("Failed to logout. Please try again.");
      });
  };

  const sortUsers = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedUsers = [...users].sort((a, b) => {
      let valueA = a[key] || "";
      let valueB = b[key] || "";

      if (key === "salary") {
        valueA = parseFloat(valueA.replace(/,/g, "") || 0);
        valueB = parseFloat(valueB.replace(/,/g, "") || 0);
      } else {
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

  const filterUsers = (searchTerm) => {
    return users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const getArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " \u2191" : " \u2193";
    }
    return "";
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="top-right">
        <button className="button" onClick={handleLogout}>
          Logout <FontAwesomeIcon icon="sign-out-alt" />
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => sortUsers("name")}>Name{getArrow("name")}</th>
              <th onClick={() => sortUsers("company")}>
                Company{getArrow("company")}
              </th>
              <th onClick={() => sortUsers("country")}>
                Country{getArrow("country")}
              </th>
              <th onClick={() => sortUsers("city")}>City{getArrow("city")}</th>
              <th onClick={() => sortUsers("salary")}>
                Salary{getArrow("salary")}
              </th>
              <th onClick={() => sortUsers("type")}>Type{getArrow("type")}</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers(searchTerm).map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.company}</td>
                <td>{user.country}</td>
                <td>{user.city}</td>
                <td>{user.salary}</td>
                <td>{user.userType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
