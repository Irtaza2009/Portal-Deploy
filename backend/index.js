const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserModel = require("./models/PakistanTechiesInEurope");

const bcrypt = require("bcrypt");

const app = express();

app.use(
  cors({
    origin: [
      "https://deploy-portal-frontend.vercel.app",
      "http://localhost:3006",
    ], // Allow all origins
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

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

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) {
          res.json("Invalid Password");
        }
        if (response) {
          res.json("Successfully Logged In");
        }
      });
    } else {
      res.json("Not Registered");
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, country, company, city, salary, password } = req.body;

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
        password: hash,
      })
        .then((user) => res.json(user))
        .catch((error) => res.json(error));
    })
    .catch((error) => console.log(error.message));
});

app.get("/getUsers", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(3007, () => {
  console.log("Server is running on port 3007");
});
