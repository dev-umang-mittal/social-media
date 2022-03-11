import React, { Component } from "react";
import "./App.css";
import Footer from "./components/basic/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import NavBar from "./components/basic/NavBar";
import SignUp from "./components/pages/SignUp";
import Forgot from "./components/pages/Forgot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthState } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT,
};

export default class App extends Component {
  render() {
    return (
      <>
        <Provider template={AlertTemplate} {...options}>
          <AuthState>
            <Router>
              <NavBar />
              <Routes>
                <Route exact path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/*" element={<Home />} />
              </Routes>
              <Footer />
            </Router>
          </AuthState>
        </Provider>
      </>
    );
  }
}
