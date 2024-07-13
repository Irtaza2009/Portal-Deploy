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
app.use(
  cors({
    origin: [
      "https://deploy-portal-frontend.vercel.app",
      "http://localhost:3006",
      "https://pteu-data.mujtabamehdi.com",
    ], // Allow all origins
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// MongoDB connection
const mongoURI =
  "mongodb+srv://irtaza:N3VKunF1B32TLC2u@cluster0.clurvxu.mongodb.net/PakistanTechiesInEurope?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

// Middleware to verify JWT
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("You are not authenticated");
  } else {
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        return res.json("You are not authenticated");
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

// User login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ email: user.email }, jwtSecretKey, {
            expiresIn: "1d",
          });
          res.cookie("token", token, {
            httpOnly: true,
            //secure: true, // Set secure to true if using HTTPS
            sameSite: "None",
          });
          res.json("Successfully Logged In");
        } else {
          res.json("Invalid Password");
        }
      });
    } else {
      res.json("Not Registered");
    }
  });
});

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

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});

app.listen(3007, () => {
  console.log("Server is running on port 3007");
});
