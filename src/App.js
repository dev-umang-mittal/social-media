import React, { Component } from "react";
import "./App.css";
import Footer from "./components/basic/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import NavBar from "./components/basic/NavBar";
import SignUp from "./components/pages/SignUp";
import Forgot from "./components/pages/Forgot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/user/*" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}
