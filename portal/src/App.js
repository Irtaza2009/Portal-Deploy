import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { faHatCowboy } from "@fortawesome/pro-thin-svg-icons";
import { faHatChef } from "@fortawesome/sharp-solid-svg-icons";
import { faPlateUtensils } from "@fortawesome/sharp-regular-svg-icons";

library.add(
  fas,
  faTwitter,
  faFontAwesome,
  faHatCowboy,
  faHatChef,
  faPlateUtensils
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
