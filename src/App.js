import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/home";
import Login from "./components/login";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Home></Home>
      <Footer />
      {/* <Login /> */}
    </>
  );
}

export default App;
