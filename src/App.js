import React, { Component } from "react";
import "./App.css";
import Footer from "./components/basic/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import NavBar from "./components/basic/NavBar";
import SignUp from "./components/pages/SignUp";
import Forgot from "./components/pages/Forgot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthState from "./context/AuthContext";
export default class App extends Component {
  render() {
    return (
      <>
        <AuthState>
          <Router>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot" element={<Forgot />} />
            </Routes>
            <Footer />
          </Router>
        </AuthState>
      </>
    );
  }
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function LoginPage() {
  return "login";
}
