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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(deployedGet)
      .then((response) => {
        setUsers(response.data);
        console.log("Users fetched:", response.data);
        setLoading(false);
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

  const NumberOfEmployeesByCompany = () => {
    const companyCounts = users.reduce((acc, user) => {
      let companyFound = false;
      for (let company in acc) {
        if (areSimilar(company, user.company)) {
          acc[company] = (acc[company] || 0) + 1;
          companyFound = true;
          break;
        }
      }
      if (!companyFound) {
        acc[user.company] = (acc[user.company] || 0) + 1;
      }
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
          label: "Number of Employees by Company",
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

  const NumberOfEmployeesByCity = () => {
    const cityCounts = users.reduce((acc, user) => {
      let cityFound = false;
      for (let city in acc) {
        if (areSimilar(city, user.city)) {
          acc[city] = (acc[city] || 0) + 1;
          cityFound = true;
          break;
        }
      }
      if (!cityFound) {
        acc[user.city] = (acc[user.city] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert companyCounts object to an array of [company, count] pairs
    const sortedCityCounts = Object.entries(cityCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Select the top 10 companies
    const top10Cities = sortedCityCounts.slice(0, 10);

    const cityLabels = top10Cities.map((city) => city[0]);
    const cityData = top10Cities.map((city) => city[1]);

    return {
      labels: cityLabels,
      datasets: [
        {
          label: "Number of Employees by City",
          data: cityData,
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

  const NumberOfTechiesByCountry = () => {
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
          label: "Number of Techies by Country",
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

  const NumberOfEmployeesByCountry = () => {
    const countryCounts = users.reduce((acc, user) => {
      let countryFound = false;
      for (let country in acc) {
        if (areSimilar(country, user.country)) {
          acc[country] = (acc[country] || 0) + 1;
          countryFound = true;
          break;
        }
      }
      if (!countryFound) {
        acc[user.country] = (acc[user.country] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert companyCounts object to an array of [company, count] pairs
    const sortedCountryCounts = Object.entries(countryCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Select the top 10 companies
    const top10Countries = sortedCountryCounts.slice(0, 10);

    const countryLabels = top10Countries.map((country) => country[0]);
    const countryData = top10Countries.map((country) => country[1]);

    return {
      labels: countryLabels,
      datasets: [
        {
          label: "Number of Employees by Country",
          data: countryData,
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

  const HighestSalaryByCountry = () => {
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
          label: "Highest Salary by Country",
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

  const AverageSalaryByCountry = () => {
    const countrySalaries = users.reduce((acc, user) => {
      const salaryStr = user.salary && user.salary.replace(/,/g, "");
      const salary = parseFloat(salaryStr);

      if (!isNaN(salary) && salary > 0) {
        if (!acc[user.country]) {
          acc[user.country] = { totalSalary: 0, count: 0 };
        }
        acc[user.country].totalSalary += salary;
        acc[user.country].count += 1;
      }

      return acc;
    }, {});

    const countryLabels = Object.keys(countrySalaries);
    const countryData = countryLabels.map(
      (country) =>
        countrySalaries[country].totalSalary / countrySalaries[country].count
    );

    return {
      labels: countryLabels,
      datasets: [
        {
          label: "Average Salary by Country",
          data: countryData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  const Top10CompaniesByAverageSalary = () => {
    const companySalaries = users.reduce((acc, user) => {
      const salaryStr = user.salary && user.salary.replace(/,/g, "");
      const salary = parseFloat(salaryStr);

      if (!isNaN(salary) && salary > 0) {
        let companyFound = false;
        for (let company in acc) {
          if (areSimilar(company, user.company)) {
            acc[company].totalSalary += salary;
            acc[company].count += 1;
            companyFound = true;
            break;
          }
        }
        if (!companyFound) {
          acc[user.company] = { totalSalary: salary, count: 1 };
        }
      }

      return acc;
    }, {});

    // Convert companySalaries object to an array of [company, avgSalary] pairs
    const avgSalaries = Object.entries(companySalaries).map(
      ([company, { totalSalary, count }]) => [company, totalSalary / count]
    );

    // Sort the array by average salary and select the top 10
    const top10Companies = avgSalaries.sort((a, b) => b[1] - a[1]).slice(0, 10);

    const companyLabels = top10Companies.map((company) => company[0]);
    const companyData = top10Companies.map((company) => company[1]);

    return {
      labels: companyLabels,
      datasets: [
        {
          label: "Average Salary by Company",
          data: companyData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  const AverageSalaryByCities = () => {
    const citySalaries = users.reduce((acc, user) => {
      const salaryStr = user.salary && user.salary.replace(/,/g, "");
      const salary = parseFloat(salaryStr);

      if (!isNaN(salary) && salary > 0) {
        if (!acc[user.city]) {
          acc[user.city] = { totalSalary: 0, count: 0 };
        }
        acc[user.city].totalSalary += salary;
        acc[user.city].count += 1;
      }

      return acc;
    }, {});

    const cityLabels = Object.keys(citySalaries);
    const cityData = cityLabels.map(
      (city) => citySalaries[city].totalSalary / citySalaries[city].count
    );

    return {
      labels: cityLabels,
      datasets: [
        {
          label: "Average Salary by City",
          data: cityData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  if (loading) {
    return (
      <div class="container">
        <div class="newtons-cradle">
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="title">Analysis</h1>
      <div style={{ width: "50%", margin: "auto" }}>
        <div className="graph-container">
          <Bar data={NumberOfEmployeesByCompany()} />
        </div>
        <div className="graph-container">
          <Pie data={NumberOfEmployeesByCountry()} />
        </div>

        <div className="graph-container">
          <Bar data={HighestSalaryByCountry()} />
        </div>
        <div className="graph-container">
          <Bar data={AverageSalaryByCountry()} />
        </div>
        <div className="graph-container">
          <Bar
            data={Top10CompaniesByAverageSalary()}
            options={{ indexAxis: "y" }}
          />
        </div>
        {/* <div className="graph-row">*/}
        <div className="graph-container">
          <Bar data={AverageSalaryByCities()} />
        </div>
        <div className="graph-container">
          <Bar data={NumberOfEmployeesByCity()} />
        </div>
        {/*</div>*/}
      </div>
    </div>
  );
}

export default Analysis;
