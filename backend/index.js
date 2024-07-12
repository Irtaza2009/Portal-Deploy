// index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const UserModel = require("./models/PakistanTechiesInEurope");

const app = express();

const jwtSecretKey = "jwt-secret-key";

// Middleware for CORS and JSON parsing

// User registration
app.post("/register", (req, res) => {
  const { name, email, country, company, city, salary, userType, password } =
    req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({
        name,
        email,
        country,
        company,
        city,
        salary,
        userType,
        password: hash,
      })
        .then((user) => {
          res.json(user);
          console.log(user);
        })
        .catch((error) => res.json(error));
    })
    .catch((error) => console.log(error.message));
});

// Get all users (public)
app.get("/getUsers", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// Authenticated route
app.get("/home", verifyUser, (req, res) => {
  console.log("Request received for /home");
  return res.json("You are authenticated");
});

app.listen(3007, () => {
  console.log("Server is running on port 3007");
});
