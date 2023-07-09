import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="home">
            Home
          </Link>
        </div>
        <div className="links">
          <Link to="/login" className="link">
            Login
          </Link>
          <Link to="/register" className="link">
            Register
          </Link>
          <Link to="/about" className="link">
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;