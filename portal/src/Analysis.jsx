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

  const getEditDistance = (a, b) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  const areSimilar = (str1, str2, threshold = 3) => {
    return getEditDistance(str1.toLowerCase(), str2.toLowerCase()) <= threshold;
  };

  const CompanyData = () => {
    const companyCounts = users.reduce((acc, user) => {
      acc[user.company] = (acc[user.company] || 0) + 1;
      return acc;
    }, {});

    // Convert companyCounts object to an array of [company, count] pairs
    const sortedCompanyCounts = Object.entries(companyCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Select the top 10 companies
    const top10Companies = sortedCompanyCounts.slice(0, 10);

    const companyLabels = top10Companies.map((company) => company[0]);
    const companyData = top10Companies.map((company) => company[1]);

    return {
      labels: companyLabels,
      datasets: [
        {
          label: "Number of Employees/Company",
          data: companyData,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 205, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
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
          label: "Number of Techies/Country",
          data: countryData,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
        },
      ],
    };
  };

  const SalaryData = () => {
    const countrySalaries = users.reduce((acc, user) => {
      if (user.salary) {
        const salary = parseFloat(user.salary.replace(/,/g, ""));
        if (salary > 0) {
          if (!acc[user.country] || salary > acc[user.country]) {
            acc[user.country] = salary;
          }
        }
      }
      return acc;
    }, {});

    const countryLabels = Object.keys(countrySalaries);
    const countryData = Object.values(countrySalaries);

    return {
      labels: countryLabels,
      datasets: [
        {
          label: "Highest Salary/Country",
          data: countryData,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
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
          <Pie data={CountryData()} />
        </div>
        <div className="graph-container">
          <Bar data={SalaryData()} />
        </div>
      </div>
    </div>
  );
}

export default Analysis;
