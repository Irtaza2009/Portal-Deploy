import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import the custom CSS

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
    <div className="container">
      <div className="table-container">
        <table>
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
                <tr key={user._id}>
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
