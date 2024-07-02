const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserModel = require("./models/PakistanTechiesInEurope");

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://deploy-portal-frontend.vercel.app"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// MongoDB connection
const mongoURI =
  "mongodb+srv://irtaza:N3VKunF1B32TLC2u@cluster0.clurvxu.mongodb.net/PakistanTechiesInEurope?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Successfully Logged In");
      } else {
        res.json("Invalid Password");
      }
    } else {
      res.json("Not Registered");
    }
  });
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});

app.get("/getUsers", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
