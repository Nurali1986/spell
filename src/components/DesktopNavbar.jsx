import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

export default function DesktopNavbar() {
  return (
    <header className="desktop-navbar">
      <div className="navbar-left">
        <img src={logo} alt="ReadAI Logo" className="navbar-logo" />
      </div>

      <nav className="nav-links">
        <Link to="/">Bosh sahifa</Link>
        <a href="#darslar">Darslar</a>
        <Link to="/games">O'yinlar</Link>
        <a href="#tariflar">Tariflar</a>
      </nav>

      <div className="nav-buttons">
        <button className="sign-in">Sign In</button>
        <button className="sign-up">Sign Up</button>
      </div>
    </header>
  );
}
