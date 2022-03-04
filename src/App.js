import React, { Component } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/home";
import Login from "./components/login";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Forgot from "./components/Forgot";
// import SignUp from "./components/SignUp";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<Forgot />} />
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}
