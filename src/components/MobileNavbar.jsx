import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookA, Gamepad2, User } from "lucide-react";
import "./Navbar.css";

export default function MobileNavbar() {
  const location = useLocation();

  return (
    <nav className="mobile-navbar">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <Home />
        <span>Bosh sahifa</span>
      </Link>
      <a href="#darslar" className="nav-item">
        <BookA />
        <span>Darslar</span>
      </a>
      <Link to="/games" className={`nav-item ${location.pathname === '/games' ? 'active' : ''}`}>
        <Gamepad2 />
        <span>O'yinlar</span>
      </Link>
      <a href="#profile" className="nav-item">
        <User />
        <span>Profile</span>
      </a>
    </nav>
  );
}
