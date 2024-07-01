import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [users, setUsers] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("https://deploy-portal-api.vercel.app/getUsers")
      .then((users) => {
        setUsers(users.data);
        console.log(users.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Country</th>
              <th>City</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.company}</td>
                  <td>{user.country}</td>
                  <td>{user.city}</td>
                  <td>{user.salary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
