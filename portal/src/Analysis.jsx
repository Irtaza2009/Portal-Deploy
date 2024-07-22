import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import "./Analysis.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

var localGet = "http://localhost:3007/getUsers";
var deployedGet = "https://deploy-portal-api.vercel.app/getUsers";

function Analysis() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(deployedGet)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const CompanyData = () => {
    const companyCounts = users.reduce((acc, user) => {
      acc[user.company] = (acc[user.company] || 0) + 1;
      return acc;
    }, {});

    const companyLabels = Object.keys(companyCounts);
    const companyData = Object.values(companyCounts);

    return {
      labels: companyLabels,
      datasets: [
        {
          label: "Number of Employees",
          data: companyData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  const CountryData = () => {
    const countryCounts = users.reduce((acc, user) => {
      acc[user.country] = (acc[user.country] || 0) + 1;
      return acc;
    }, {});

    const countryLabels = Object.keys(countryCounts);
    const countryData = Object.values(countryCounts);

    return {
      labels: countryLabels,
      datasets: [
        {
          label: "Number of Techies",
          data: countryData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  const SalaryData = () => {
    const countrySalaries = users.reduce((acc, user) => {
      const salary = parseFloat(user.salary.replace(/,/g, "") || 0);
      if (!acc[user.country] || salary > acc[user.country]) {
        acc[user.country] = salary;
      }
      return acc;
    }, {});

    const countryLabels = Object.keys(countrySalaries);
    const countryData = Object.values(countrySalaries);

    return {
      labels: countryLabels,
      datasets: [
        {
          label: "Highest Salary",
          data: countryData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  return (
    <div>
      <h1 className="title">Analysis</h1>
      <div style={{ width: "600px", margin: "auto" }}>
        <div className="graph-container">
          <Bar data={CompanyData()} />
        </div>
        <div className="graph-container">
          <Bar data={CountryData()} />
        </div>
        <div className="graph-container">
          <Bar data={SalaryData()} />
        </div>
      </div>
    </div>
  );
}

export default Analysis;
