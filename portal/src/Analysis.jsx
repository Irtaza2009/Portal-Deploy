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
      .get(localGet)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const prepareChartData = () => {
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

  return (
    <div>
      <h1>Analysis</h1>
      <div style={{ width: "600px", margin: "auto" }}>
        <Bar data={prepareChartData()} />
      </div>
    </div>
  );
}

export default Analysis;
